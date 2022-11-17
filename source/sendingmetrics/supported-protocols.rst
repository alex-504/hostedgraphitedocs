
Supported Protocols
===================

.. contents::

In this section, we will outline the most common protocols used to send metrics to Hosted Graphite, along with some useful examples.

TCP Connection
--------------
A simple way to send metrics to us is via a TCP connection.  First, **ensure each metric name is prefixed by your API key**, then you securely send your metric(s) using the :ref:`metric-data-format`.

**Host**: carbon.hostedgraphite.com **Port**: 2003

It is not necessary (nor recommended) to create a new connection for each metric. You can put multiple metrics on separate lines. A long-lived connection will be faster because you won't have to wait to establish
a new connection each time. The following simple example shows how to send a single TCP metric using the `Netcat <http://netcat.sourceforge.net/>`_ utility: ::

   echo "YOUR-API-KEY.test.testing 1.2" | nc carbon.hostedgraphite.com 2003

For programming language-specific examples of sending metrics via TCP, check out our :doc:`/languageguide/index`.



UDP Packets
-----------
For a similar, but non-blocking alternative to TCP, you can use UDP packets to send the metric(s) to us. **Ensure each metric name is prefixed by your API key** (:ref:`see above <api-key>`) to securely send your UDP metric(s) using the :ref:`metric-data-format`.

**Host**: carbon.hostedgraphite.com **Port**: 2003

Here's a simple example using `netcat <http://netcat.sourceforge.net/>`_ on linux: ::

   echo "YOUR-API-KEY.test.udp.metric 1.2" | nc -uw0 carbon.hostedgraphite.com 2003

You can send multiple metrics on separate lines as with TCP, but be aware there is a size limit of 8192 bytes for UDP packets.

For programming language-specific examples of sending metrics via UDP, check out our :doc:`/languageguide/index`.



HTTP POST
---------
POST your metrics to the following URL:

**https://www.hostedgraphite.com/api/v1/sink**

Your metric data should be provided in the :ref:`metric-data-format` as the HTTP POST payload. Don't prefix your metric names with your :ref:`API Key <api-key>` - instead use it as the username for Basic Authentication.

Here's an example using `curl <https://curl.haxx.se/>`_ on linux, which lets you provide the API key in the URL. ::

   curl https://YOUR-API-KEY@www.hostedgraphite.com/api/v1/sink --data-binary "test.http.metric 1.2"

If your data was accepted, you will receive a **HTTP/1.1 202 Accepted** response, with no content body. If your data wasn't accepted, you'll receive a 400 error with more information about why.

For programming language-specific examples of sending metrics via HTTP POST, check out our :doc:`/languageguide/index`.


TCP Over TLS
------------
If you want, you can send your metrics over TCP using an encrypted tunnel. First, **ensure each metric name is prefixed by your API key** (:ref:`see above <api-key>`), then send your metric(s) using the :ref:`metric-data-format`.

**Host**: carbon.hostedgraphite.com **Port**: 20030

The following simple example shows how to send a single metric using `Ncat <https://nmap.org/ncat/>`_ on linux: ::

   echo "YOUR-API-KEY.conc_users 59" | ncat --ssl carbon.hostedgraphite.com 20030

Alternatively, the following example using `OpenSSL <https://www.openssl.org/>`_ should work out of the box in OS X: ::

   echo "YOUR-API-KEY.conc_users 59" |  openssl s_client -connect carbon.hostedgraphite.com:20030

For programming language-specific examples of sending metrics via TLS over TCP, check out our :doc:`/languageguide/index`.

.. index:: statsd

StatsD
------
StatsD is commonly used as a pre-aggregation service and sends metrics via UDP by default. First, **ensure each metric name is prefixed by your API key** (:ref:`see above <api-key>`), then send your metric(s) using the :ref:`metric-data-format`.

**Host**: carbon.hostedgraphite.com **Port**: 8125

The following simple example shows how to send a single counter metric using `Ncat <https://nmap.org/ncat/>`_ on linux: ::

   echo "YOUR-API-KEY.test.statsd.metric:1.2|c" | nc -u -w1 statsd.hostedgraphite.com 8125

Find more information about using StatsD and Hosted StatsD in our :doc:`Add-ons and Integrations Guide </integrationguide/index>`.


.. index:: Quick Reference

Quick Reference
---------------

You can send Graphite messages via:

- TCP & UDP connections to **carbon.hostedgraphite.com** port **2003** (Metric names *must* be :ref:`API Key <api-key>`-prefixed)
- TCP over TLS tunnel to **carbon.hostedgraphite.com** port **20030** (Metric names *must* be :ref:`API Key <api-key>`-prefixed)
- HTTP POST to **https://YOUR-API-KEY@www.hostedgraphite.com/api/v1/sink** (Metric names are *not* :ref:`API Key <api-key>`-prefixed, HTTP 202 response on success)
- StatsD to **carbon.hostedgraphite.com** port **8125** (Metric names *must* be :ref:`API Key <api-key>`-prefixed)
- Python Pickle **carbon.hostedgraphite.com** port **2004** (discussed in the :doc:`language guide </languageguide/lg_python_pickle>`)


**Tip**: Send your metrics to us in a non-blocking/asynchronous manner. Holding up processing to send metrics will skew the data (if it's being used for performance analysis), and in the worst case have a negative impact on the responsiveness of your app to users.
