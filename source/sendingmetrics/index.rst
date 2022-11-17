
Sending Metrics
===============

Hosted Graphite makes it easy to send and manage different types of metrics from any source.   

.. toctree::
   :maxdepth: 1
   :glob: 
  
   supported-protocols
   tagged-metrics
   metric-management


Types of Metrics
----------------
The most common types of metrics sent to Hosted Graphite include **system metrics** (from an agent), **custom metrics** (from within your application code), and **service metrics** (from a 3rd party service that we integrate with).

- To learn more about collecting system and server metrics using an agent, please refer to our :doc:`Agents Guide </agents/index>` for a list of agents that are easy to configure with Graphite.

- For information on sending metrics without an agent, e.g. custom application metrics, take a look at the examples in our :doc:`Language Guide </languageguide/index>`. This is a comprehensive guide for configuring custom metrics into your application code, using a socket connection.

- Find out how to send metrics from a service that we integrate with, such as Heroku and AWS. Our :doc:`Add-Ons and Integrations Guide </integrationguide/index>` will help you get started!


Metric APIs
-----------
- Check out our :doc:`Metrics API </api/metric_api>` and :doc:`Tag API </api/tag_api>` that can be used for listing, searching, and deleting your metrics with several useful parameters.