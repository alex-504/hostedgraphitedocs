
Shell
=====

.. contents::

.. index:: Shell, Command Line, bash, zsh, netcat

Sending a metric via TCP 
------------------------ 

Using the `netcat <http://netcat.sourceforge.net/>`_ utility

.. code-block:: bash
    
    echo "YOUR-API-KEY.foo 1.2" | nc carbon.hostedgraphite.com 2003

Sending a metric via UDP 
------------------------ 

Using the `netcat <http://netcat.sourceforge.net/>`_ utility

.. code-block:: bash

    echo "YOUR-API-KEY.foo 1.2" | nc -uw0 carbon.hostedgraphite.com 2003

Sending a metric via TCP over TLS
---------------------------------
Using the `Ncat <https://nmap.org/ncat/>`_ utility

.. code-block:: bash

    echo "YOUR-API-KEY.con_users 1.3" | ncat --ssl carbon.hostedgraphite.com 20030

Alternatively, the following example using `OpenSSL <https://www.openssl.org/>`_ should work out of the box in OS X:

.. code-block:: bash

    echo "YOUR-API-KEY.con_users 1.3" |  openssl s_client -connect carbon.hostedgraphite.com:20030

Sending a metric via HTTPs
--------------------------

Using the `Curl <https://curl.haxx.se/>`_ utility

.. code-block:: bash

    curl https://YOUR-API-KEY@www.hostedgraphite.com/api/v1/sink --data-binary "foo 1.2"

Send multiple metrics with Curl
-------------------------------

.. code-block:: bash

    curl https://YOUR-API-KEY@www.hostedgraphite.com/api/v1/sink --data-binary @data.txt

where data.txt contains multiple metrics and values on a separate line:

::

  foo.bar.x 1
  foo.bar.y 2

.. include:: ../common/common_getapikey.rst
.. raw:: html

    <script src="../_static/uid_prefix.js"></script>
