
Python 2.x
===========

.. index:: Python

Interesting Python Graphite Libraries
-------------------------------------

- | **A Python module for sending metrics to Graphite over UDP**
  | `https://github.com/derpston/python-graphiteudp <https://github.com/derpston/python-graphiteudp>`_ - Charlie wrote this library, and we use it internally. It's a good simple library for sending metrics over UDP in python.
- | **Diamond - Send system metrics to Graphite**
  | :doc:`Diamond </agents/diamond>` - A really useful python daemon to send system metrics such as CPU usage, load, Disk IO etc.

Sending a metric via TCP
------------------------

.. code-block:: python

    import socket

    conn = socket.create_connection(("YOUR-UID.carbon.hostedgraphite.com", 2003))
    conn.send("YOUR-API-KEY.foo 1.2\n")
    conn.close()

Sending a metric via UDP
------------------------

.. code-block:: python

    import socket

    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.sendto("YOUR-API-KEY.foo 1.2\n", ("YOUR-UID.carbon.hostedgraphite.com", 2003))

Sending a metric using HTTP POST
--------------------------------

.. code-block:: python

    import urllib2, base64

    url = "https://www.hostedgraphite.com/api/v1/sink"
    api_key = "YOUR-API-KEY"

    request = urllib2.Request(url, "foo 1.2")
    request.add_header("Authorization", "Basic %s" % base64.encodestring(api_key).strip())
    result = urllib2.urlopen(request)



Sending a metric via TCP over TLS tunnel
----------------------------------------

.. code-block:: python

    import socket, ssl

    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    ssl_sock = ssl.wrap_socket(s)
    ssl_sock.connect(("YOUR-UID.carbon.hostedgraphite.com", 20030))
    ssl_sock.write("YOUR-API-KEY.foo 1.2\n")


Python 3.x
==========

Sending a metric via TCP
------------------------

.. code-block:: python

    import socket
    conn = socket.create_connection(("YOUR-UID.carbon.hostedgraphite.com", 2003))
    conn.send("YOUR-API-KEY.foo 1\n".encode('utf-8'))
    conn.close()


Sending a metric via UDP
------------------------

.. code-block:: python

    import socket
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.sendto("YOUR-API-KEY.foo 1\n".encode('utf-8'), ("YOUR-UID.carbon.hostedgraphite.com", 2003))



Sending a metric using HTTP POST
--------------------------------

With the requests module:

.. code-block:: python

   import requests
   response = requests.put("http://www.hostedgraphite.com/api/v1/sink", auth = ("YOUR-API-KEY", ""),
   data = "foo 1")


Using only stdlib modules: (Contributed by `Waldo <https://github.com/gwaldo/HostedGraphite_Python3>`_, thanks!)

.. code-block:: python

   import urllib.request
   from base64 import b64encode
   
   url = "https://www.hostedgraphite.com/api/v1/sink"
   api_key = b'YOUR-API-KEY'
   metric = "foo 1.2".encode('utf-8')
   headers = {'Authorization': b'Basic ' + b64encode(api_key)}
   request = urllib.request.Request(url, metric, headers)
   result = urllib.request.urlopen(request)

Sending a metric via TCP over TLS tunnel
----------------------------------------

.. code-block:: python

    import socket, ssl

    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    ssl_sock = ssl.wrap_socket(s)
    ssl_sock.connect(("YOUR-UID.carbon.hostedgraphite.com", 20030))
    ssl_sock.write("YOUR-API-KEY.foo 1.2\n".encode("UTF-8"))


.. include:: ../common/common_getapikey.rst
.. raw:: html

    <script src="../_static/uid_prefix.js"></script>
