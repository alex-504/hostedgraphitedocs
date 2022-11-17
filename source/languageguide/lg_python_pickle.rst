
Python Pickle
=============
.. index:: Python Pickle

Intended for slightly more advanced users, the pickle protocol is a more efficient take on the :ref:`plaintext protocol <metric-data-format>`, and supports sending metrics to Hosted Graphite in batches.

Pickled data forms a list of multi-level tuples:

.. code-block:: python

	[(path, (timestamp, value)), ...]

You’ll need to pack your pickled data into a packet containing a simple header:

.. code-block:: python

	payload = pickle.dumps(listOfMetricTuples, protocol=2)
	header = struct.pack("!L", len(payload))
	message = header + payload

Once you’ve formed a list of sufficient size and pickled it, like ``message`` above, send the data over a TCP socket to ``YOUR-UID.carbon.hostedgraphite.com:2004``.

Your API Key is prefixed to the metricname as per regular Python methods:

.. code-block:: python

    "YOUR-API-KEY.my.metric.name"

If you have any trouble or any questions, `contact us <help@hostedgraphite.com>`_.

Carbon Relay
------------

If you would prefer to use a carbon-relay daemon to send metric data to Hosted Graphite, just configure it to use ``YOUR-UID.carbon.hostedgraphite.com:2004`` as a ``DESTINATION`` in your ``carbon.conf`` and ``relay-rules.conf`` files.

``carbon.conf:`` ::

    [relay]
    ...
    RELAY_METHOD = rules
    DESTINATIONS = YOUR-UID.carbon.hostedgraphite.com:2004

``relay-rules.conf:`` ::

    [default]
    default = true
    destinations = YOUR-UID.carbon.hostedgraphite.com:2004

If you're currently using the carbon-cache daemon and would like to utilize carbon-relay to send your metrics to us and also to your own carbon instance, you will have to send metrics to carbon-relay instead of carbon.

To do this, you have to configure carbon-relay to listen on the port that your current carbon-cache is listening. Then you will need to configure carbon-cache to listen on a new port.

You can then add your carbon-cache instance as a ``DESTINATION`` to have carbon-relay forward all metrics to Hosted Graphite AND your local carbon-cache 
  
``current carbon.conf:`` ::

    [cache]
    ...
    LINE_RECEIVER_PORT = 2003
    PICKLE_RECEIVER_PORT = 2004 
    ...
    
    [relay]
    ...
    RELAY_METHOD = rules
    DESTINATIONS = YOUR-UID.carbon.hostedgraphite.com:2004

This should be changed to:

``new carbon.conf:`` ::

    [cache]
    ...
    LINE_RECEIVER_PORT = 2013
    PICKLE_RECEIVER_PORT = 2014 
    ...
    
    [relay]
    ...
    RELAY_METHOD = rules
    DESTINATIONS = YOUR-UID.carbon.hostedgraphite.com:2004, 127.0.0.1:2014
    LINE_RECEIVER_PORT = 2003
    PICKLE_RECEIVER_PORT = 2004

``relay-rules.conf`` ::
    
    [default]
    default = true
    destinations = YOUR-UID.carbon.hostedgraphite.com:2004, 127.0.0.1:2014	

If you're doing this and you'd like to avoid prefixing every metric with your API key, please `contact us to discuss alternatives <help@hostedgraphite.com>`_, including IP whitelisting.

Carbon Relay Secured With Stunnel
---------------------------------

If you want to encrypt the metric data from your Carbon Relay, you can use Stunnel. Carbon-Relay should be configured to send metrics to Stunnel over localhost

To install Stunnel::
    
    sudo apt-get install stunnel
    or
    sudo yum install stunnel


**Configuring Stunnel**

Stunnel will need a configuration file. By default, Stunnel will look at ``/etc/stunnel/stunnel.conf``. You may need to create this file yourself.

Put the following lines inside ``/etc/stunnel/stunnel.conf``:: 

    foreground = yes 

    [hg-tls]
    client = yes
    accept = 20041
    connect = 72c4f55b.carbon.hostedgraphite.com:20040
    verify = 2
    CAfile = /etc/ssl/certs/ca-bundle.crt
    #CApath = /etc/ssl/certs

* ``foreground = yes``
    This shows the degbug logs. You may want to remove this line once Stunnel is configured and running correctly.
* ``accept = <port>``
    Carbon relay must be configured to send metrics to ``<port>``.
* ``connect = 72c4f55b.carbon.hostedgraphite.com:20040``
    Hosted Graphite will accept Stunnel connections on port 20040
* ``CAfile`` / ``CApath``
    You only need one of these. You will need to provide a path to your ssl certificates.

    * ``CAfile`` expects a certificate file. Some of the default locations of these files are::
    
        "/etc/ssl/certs/ca-certificates.crt"  // Debian/Ubuntu/Gentoo etc.
        "/etc/pki/tls/certs/ca-bundle.crt"    // Fedora/RHEL
        "/etc/ssl/ca-bundle.pem"              // OpenSUSE
        "/etc/pki/tls/cacert.pem"             // OpenELEC

    * ``CApath`` expects a directory containing certificates named ``XXXXXXXX.0`` where ``XXXXXXXX`` is the hash value of the DER encoded subject of the cert.

You can read more about Stunnel configuration options `here <https://www.stunnel.org/static/stunnel.html>`_.

**Reconfiguring Carbon-Relay**

Carbon relay needs to send metrics to Stunnel now.

``carbon.conf``::

    [relay]
    ...
    DESTINATIONS = localhost:20041:stunnel

``relay-rules.conf``::

    [default]
    default = true
    destinations = localhost:20041:stunnel

Now start Stunnel::

    stunnel

**Note:** 
If your package manager downloaded stunnel4, you may have to start stunnel with::

    stunnel4

.. raw:: html

    <script src="../_static/uid_prefix.js"></script>


