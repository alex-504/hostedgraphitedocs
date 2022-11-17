
StatsD
======

.. index:: StatsD

`StatsD <https://github.com/etsy/statsd>`_ is a network daemon that runs on the `Node.js <https://nodejs.org/>`_ platform.  It listens for statistics such as counters and timers sent via UDP, 
performs aggregation of this data,  then sends it on to a configurable backend service - such as Hosted Graphite. You can use StatsD to perform such 
aggregation before sending your metrics to us by following this short guide.

- Install StatsD by following the `installation instructions <https://github.com/etsy/statsd#installation-and-configuration>`_.
- Once installed, StatsD can then be used with a config file like this: 

::

    {
	port: 8125,
	flushInterval: 10000,
	graphitePort: 2003,
	graphiteHost: "carbon.hostedgraphite.com",
	graphite: {
	     legacyNamespace: false,
	     globalPrefix: "your-api-key-here"  
	  }
    }

Hosted StatsD
-------------

We also provide hosted StatsD if you don't have the luxury of running a server yourself. Check out the documentation for :doc:`Hosted StatsD </integrationguide/ig_hosted_statsd>`. 
