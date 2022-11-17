Migrating to Hosted Graphite from your own Graphite installation
================================================================

.. index:: whisper, whisper files, graphite whisper

We get a lot of questions from customers who want to move to Hosted Graphite from their own Graphite install. Here are a
few common queries we get:

- | **Can I migrate existing whisper file data to Hosted Graphite?**
  | Yes, and depending on the quantity of metrics (and your subscription plan) we can do this for you.
  |
- | **How can I tell how many metrics I have / what plan would my existing install fit in?**
  | In your Graphite directory, run the following to get the total number of metrics you have:

  .. code-block:: bash

      find . -type f -print | grep ".wsp" -c


  This will get the amount used in the last 30 days, which is useful as a gauge of what metrics you are actually using:

  .. code-block:: bash

      find . -mtime -30 -type f -print | grep ".wsp" -c


  If you are using :doc:`StatsD </integrationguide/ig_hosted_statsd>`, you can divide this number of metrics by the number of additional aggregations that StatsD sends such as mean, upper, lower etc.
  StatsD typically adds 8 extra measurements per metric, but may be different for your install. Unless you're really attached to StatsD,
  you don't need these - we already collect these different :doc:`data views </additional/data-views>` for each metric.

.. index:: data import

- | **How can I get my data in?**
  | You can use one of our :doc:`language guide </languageguide/index>` to send data to us. Send your original data values with the timestamp of the original measurement. Send via TCP, and limit your request to < 1000 datapoints per second - otherwise you risk being rate-limited.
  |
  | Alternatively, if you move to one of our `paid plans <https://www.metricfire.com/pricing/>`_ just drop your whisper files into AWS and send us a mail. We'll do the migration for you.

