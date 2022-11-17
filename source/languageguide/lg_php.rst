
PHP
===
.. index:: PHP

Interesting PHP Metrics Libraries
---------------------------------

- | **PHP StatsD**
  | `https://github.com/domnikl/statsd-php <https://github.com/domnikl/statsd-php>`_ - A PHP StatsD client available in Composer
  | `https://github.com/seejohnrun/php-statsd <https://github.com/seejohnrun/php-statsd>`_ - A simple PHP StatsD client


Sending a metric via TCP
------------------------

.. code-block:: php

    <?
        $conn = fsockopen("YOUR-UID.carbon.hostedgraphite.com", 2003);
        fwrite($conn, "YOUR-API-KEY.foo 1.2\n");
        fclose($conn);
    ?>

Sending a metric via UDP
------------------------

.. code-block:: php

    <?    
        $sock = socket_create(AF_INET, SOCK_DGRAM, SOL_UDP);
        $message = "YOUR-API-KEY.foo 1.2\n";
        socket_sendto($sock, $message, strlen($message), 0, "YOUR-UID.carbon.hostedgraphite.com", 2003);
    ?>

	
.. include:: ../common/common_getapikey.rst


Sending a metric via UDP on Heroku
-----------------------------------

.. code-block:: php

   <?

        $fp = fsockopen('udp://YOUR-UID.carbon.hostedgraphite.com', 2003);
        fwrite($fp, "YOUR-API-KEY.foo 1.2\n");
        fclose($fp);
   ?>

.. raw:: html

    <script src="../_static/uid_prefix.js"></script>
