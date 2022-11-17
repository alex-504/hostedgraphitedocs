
Java
====

.. index:: Java, java statsd, coda hale, yammer

.. contents::

Interesting Java Metrics Libraries
----------------------------------

- | **Coda Hale's metrics library**
  | `http://metrics.dropwizard.io/ <http://metrics.dropwizard.io/>`_ - Developed by Yammer to instrument their JVM-based backend services, it's a really comprehensive Java metrics library and works well with Hosted Graphite.

- | **Metrics-StatsD for Coda Hale's metrics library**
  | `https://github.com/organicveggie/metrics-statsd <https://github.com/organicveggie/metrics-statsd>`_ - A StatsD reporter plugin for Coda Hale's metrics library.


Java DNS Behaviour
------------------
Java's default JVM behaviour includes an optimisation / attempt to prevent DNS cache poisoning whereby it will read DNS entries
for a service and then cache them forever. **This is something that will result in problems with Hosted Graphite**.

To service our hundreds of customers we run a **lot** of different machines and we swap machines in and out all the time.
This means that if you have cached the DNS entry for a machine that no longer exists, you're going to drop a lot of data.

To prevent this, you can set the JVM cache behaviour to only cache entries for 60 seconds:

.. code-block:: java

    java.security.Security.setProperty("networkaddress.cache.ttl" , "60");



Sending a metric via TCP
------------------------

.. code-block:: java

    import java.io.DataOutputStream;
    import java.net.Socket;

    ...
    Socket conn          = new Socket("YOUR-UID.carbon.hostedgraphite.com", 2003);
    DataOutputStream dos = new DataOutputStream(conn.getOutputStream());
    dos.writeBytes("YOUR-API-KEY.foo 1.2\n");
    conn.close();
  

Sending a metric via UDP
------------------------

.. code-block:: java

    import java.net.DatagramSocket;
    import java.net.DatagramPacket;
    import java.net.InetAddress;

    ...
    DatagramSocket sock   = new DatagramSocket();
    InetAddress addr      = InetAddress.getByName("YOUR-UID.carbon.hostedgraphite.com");
    byte[] message        = "YOUR-API-KEY.foo 1.2\n".getBytes();
    DatagramPacket packet = new DatagramPacket(message, message.length, addr, 2003);
    sock.send(packet);
    sock.close();


Sending a metric via HTTP POST
------------------------------

.. code-block:: java

    import java.util.Base64;
    import javax.net.ssl.HttpsURLConnection;
    import java.io.*;
    import java.net.URL;

    // Assumes the reader will try/catch the appropriate exceptions, and clean up
    // The connection when they're done with it!

    String data = "foo 1.2";
    URL url     = new URL("https://www.hostedgraphite.com/api/v1/sink");
    HttpsURLConnection connection = (HttpsURLConnection)url.openConnection();

    String key        = "YOUR_API_KEY";
    String authHeader = Base64.getEncoder().encodeToString(key.getBytes());

    connection.setRequestProperty("Authorization", "Basic " + authHeader);
    connection.setRequestMethod("POST");
    connection.setRequestProperty("Content-Length", String.valueOf(data.getBytes().length));
    connection.setUseCaches (false);
    connection.setDoInput(true);
    connection.setDoOutput(true);

    OutputStream wr = connection.getOutputStream();
    wr.write(data.getBytes("UTF-8"));
    wr.flush();
    wr.close();



Google App Engine HTTP Post
---------------------------

.. code-block:: java

    URLFetchService fetcher= URLFetchServiceFactory.getURLFetchService();
    String data = "foo 1.2";
    String key  = "YOUR_API_KEY";

    String authHeaderString = "Basic " + Base64.encodeBase64String(key).getBytes("ISO-8859-1");
    HTTPHeader authHeader   = new HTTPHeader("Authorization", authHeaderString);

    HTTPRequest request = new HTTPRequest("https://www.hostedgraphite.com/api/v1/sink", HTTPMethod.POST);
    request.getFetchOptions().setDeadline(10);
    request.setHeader(authHeader);

    request.setPayload(data.getBytes());
    HTTPResponse response = fetcher.fetch(request);

.. include:: ../common/common_getapikey.rst
.. raw:: html

    <script src="../_static/uid_prefix.js"></script>
