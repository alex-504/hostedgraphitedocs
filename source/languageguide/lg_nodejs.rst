
Node.js
=======
.. index:: Node.JS

Sending a metric via TCP
------------------------

.. code-block:: javascript

    var net = require("net");

    var socket = net.createConnection(2003, "YOUR-UID.carbon.hostedgraphite.com", function() {
        socket.write("YOUR-API-KEY.foo 1.2\n");
        socket.end();
    });

Sending a metric via UDP
------------------------

.. code-block:: javascript

    // For Nodejs v10
    var dgram = require("dgram");

    var message = Buffer.from("YOUR-API-KEY.foo 1.2\n")
    var client = dgram.createSocket("udp4");
    client.send(message, 0, message.length, 2003, "YOUR-UID.carbon.hostedgraphite.com", function(err, bytes) {
        client.close();
    });


.. include:: ../common/common_getapikey.rst
.. raw:: html

    <script src="../_static/uid_prefix.js"></script>
