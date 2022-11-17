
Hosted StatsD
=============

What is StatsD?
---------------

StatsD is a very simple server daemon which collects data from your systems. It happily collects as much data as you want to send it, aggregates it into a few different views and intermittently flushes it out to your backend service - in this case Graphite. When you want to create a new metric, you just send it on and StatsD happily creates it.


Why use StatsD
--------------
Let's take the example that you have a very busy site sending data every time a user does something interesting on the site. If your site activity were to grow linearly, so would the data sent to your measurement system - and soon you might end up in a situation where you're overwhelming it. One of the useful things StatsD can do is to sample data; by sending only a percentage of the requests you get a lot less data sent while still capturing an accurate view of the system.


Enabling Hosted StatsD
----------------------

Our Hosted StatsD service is available on our Small plan and above, and is used by a variety of customers big and small. We regularly update it with the latest fixes and features from the open source project.

.. figure:: /docimg/statsd_enable.png
   :scale: 50%
   :alt: Enabling Hosted StatsD
   :align: center

   By hitting "Enable StatsD" you'll receive instructions on where to send data for your account.


Configuring StatsD Metrics
--------------------------

Hosted Graphite supports filtering the raw metrics your Hosted StatsD instance produces for some of its metric types such as counters and timers. This allows you to choose only the metric views you actually use, which reduces the metric usage count for your payment plan.

To enable/disable the specific metric views you want us to store, click the ``Filters`` button on the 'StatsD' section of the `add-ons page <https://www.hostedgraphite.com/app/addons/>`_.

.. figure:: /docimg/statsd_filters_button.png
   :scale: 80%
   :alt: StatsD filtering button
   :align: center

Here you will see a list of StatsD metric types and their corresponding metric views. Checking/unchecking these views will enable/disable them respectively.
Click ``Save`` to save your changes. 

.. figure:: /docimg/statsd_filters_list.png
   :scale: 80%
   :alt: StatsD filter list
   :align: center


Configuring StatsD Options
--------------------------

Hosted Graphite allows users to configure StatsD settings for ``deleteGauges``, ``deleteTimers``, ``deleteSets``, and ``deleteCounters``. StatsD will send a value of ``0`` for a metric it hasn't received any data for unless these settings have been activated. ``deleteGauges`` will stop sending values for inactive gauges, ``deleteTimers`` will stop sending valuesfor inactive timers, and so on. 


These are enabled by default, and we recommend they remain activated to prevent stale metrics from persisting in your account. For example, if you have :ref:`metric expiry <accountsettings_metricexpiry>` set, metrics that are being persisted by the normal StatsD behaviour will not expire. 

To enable/disable the specific config values, click the ``Config`` button on the 'StatsD' section of the `add-ons page <https://www.hostedgraphite.com/app/addons/>`_.

.. figure:: /docimg/statsd_config_button.png
   :scale: 80%
   :alt: StatsD config button
   :align: center

Here you will see a list of StatsD config options. Checking/unchecking these options will enable/disable them respectively.
Click ``Save`` to save your changes. 

.. figure:: /docimg/statsd_config_list.png
   :scale: 80%
   :alt: StatsD config list
   :align: center


Sending a StatsD Metric
------------------------ 

Using the `netcat <http://netcat.sourceforge.net/>`_ utility:

.. code-block:: bash
    
    echo "YOUR-API-KEY.test.testing:1.2|c" | nc -u -w1 statsd.hostedgraphite.com 8125

Note that the metric name will prefixed with the type of metric (timers, gauges, counters) when it is processed by our system. For example: ``counters.foo.bar`` or ``gauges.bar.foo``.

- **timers** "<api-key>metric.name:<value>|ms"
- **gauges** "<api-key>metric.name:<value>|g"
- **counters** "<api-key>metric.name:<value>|c"

