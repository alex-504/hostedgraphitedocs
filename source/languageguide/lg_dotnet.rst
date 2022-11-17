
.NET
====
.. index:: DotNET

Interesting .NET Metrics Libraries
----------------------------------

- | **A simple .NET library for Graphite and StatsD**
  | `https://github.com/ragnard/Graphite.NET <https://github.com/ragnard/Graphite.NET>`_ - A simple .NET library to collects stats and pass them on to Graphite

- | **A .NET library to send data to Hosted Graphite**
  | `https://github.com/Plasma/HostedGraphite <https://github.com/Plasma/HostedGraphite>`_ - Client library to send statistics to HostedGraphite.com using .Net, a work-in-progress





Sending a metric via UDP
------------------------

.. code-block:: csharp

    var endPoint = new IPEndPoint(Dns.GetHostAddresses("YOUR-UID.carbon.hostedgraphite.com")[0], 2003);
    var bytes = Encoding.ASCII.GetBytes("YOUR-API-KEY.foo 1.2\n");
    var sock = new Socket(AddressFamily.InterNetwork,SocketType.Dgram, ProtocolType.Udp) { Blocking = false };
    sock.SendTo(bytes, endPoint);

	

.. include:: ../common/common_getapikey.rst
.. raw:: html

    <script src="../_static/uid_prefix.js"></script>

