.. index:: Metrics, managing metrics

Metric Management
=================

.. contents::

Managing your metrics in the Hosted Graphite application is as simple as locating them and deleting them. You can also configure :ref:`Expiry Rules <accountsettings_metricexpiry>` to target certain metrics for deletion after a specified time interval.


Finding Your Metrics
--------------------

By navigating to the Metrics menu and entering a search term into the box, you can search for your metrics. The * operator is used to add a wider search to your metric name. In this example "counters.foo*" searches for any metrics starting with "counters.foo". The metric search follows the same format as that of the Graphite composer. Additionally, you can click on the number of 'matches' to render a full list of metrics that match your search pattern.


.. figure:: /docimg/metrics_list.png
   :scale: 90%
   :alt: Searching for your metrics
   :align: center

   Searching for metrics
   
- To find your **tagged metrics**, navigate to the Tag Search feature of the Hosted Graphite application. Read more about sending and graphing tagged metrics in our :doc:`Tagged Metrics Guide </sendingmetrics/tagged-metrics>`.


Viewing Metrics
----------------

.. index:: View metrics

Selecting the "Quick view" button next to a metric name will bring you to a quick graph of that metric's usage in the last 24 hours. Clicking the "Open in Composer" button will take you directly to the Graphite graph composer where you can dig into the metric in more detail.


.. figure:: /docimg/metric_quick_view.png
   :scale: 40%
   :alt: Viewing your metrics
   :align: center

   Viewing metrics


Deleting Metrics
----------------

If you no longer need a metric, you can select and delete it or delete all metrics matching the search pattern you have entered. As we run a large distributed system and deletes have a lower priority than new data coming in, deletes can take up to 30 minutes to be processed fully. In the interim, you should not send the same metric names. 

.. index:: Delete metrics, remove metrics, delete all metrics


.. figure:: /docimg/delete_metrics_popup.png
   :scale: 90%
   :alt: Delete metrics interface
   :align: center

   Deleting a metric
   
   
**Please Note: A deleted metric will be recreated if you continue to send data to it.** We do not delete any data until it expires naturally, even if the metric namespace has been deleted. So if you send data to a deleted metric, it will map to and render all of its respective data stored in our backend. Knowing this can be useful because if you want to remove your 'stale' metrics, you can simply delete all metrics (*) and let your active metrics be automatically recreated.


