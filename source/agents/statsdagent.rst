StatsD
======


StatsD is a popular tool for aggregating your data into different statistical views. It provides things like counters, timers, and gauges to provide different ways to look at your data. StatsD can also be used to pre-aggregate your data before sending to Hosted Graphite.

You can configure your StatsD instance to send metrics to us by following our :doc:`StatsD docs </integrationguide/ig_statsd>` in our Add-Ons and Integrations Guide.

If you haven't installed StatsD yet, you might also find the StatsD `installation instructions <https://github.com/statsd/statsd#installation-and-configuration>`_ helpful.

Hosted StatsD
+++++++++++++
We also provide a Hosted StatsD solution if you don't have the luxury of running a server yourself, check out the documentation for :doc:`Hosted StatsD </integrationguide/ig_hosted_statsd>` to get set up with only a few clicks!

Try our Data Views
++++++++++++++++++
Like the added counters but not interested in using StatsD? Learn about our default :doc:`Data Views </additional/data-views>` provided for all metrics. Our Data Views are comparable to StatsD in the following ways:

- **counting** -> ‘:sum’ or ‘:obvs’
- **gauges** -> ‘:sumrate’ or ‘:obvsrate’
- **timers** -> ‘:avg’ or ‘:min’ or ‘:max’