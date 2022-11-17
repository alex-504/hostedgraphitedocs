
FAQ
===

.. _faq_general:
.. index:: FAQ - General

.. contents::

General
-------
  
.. index: What is Graphite?

- | **What is Graphite?**
  | `Graphite <https://graphite.readthedocs.io/en/latest/>`_ is an open-source, highly scalable, real-time graphing system. The metrics that you send to Graphite's *carbon* endpoint will be aggregated, timestamped, and can be graphed using the Graphite-Web `dashboard interface <https://graphite.readthedocs.io/en/latest/dashboard.html>`_. Graphite also offers a `Metric API <https://graphite.readthedocs.io/en/latest/metrics_api.html>`_, `Whisper database <https://graphite.readthedocs.io/en/latest/whisper.html>`_, and a library of `functions <https://graphite.readthedocs.io/en/latest/functions.html>`_ that can be used to manipulate the data upon rendering. 

.. index:: What is Hosted Graphite?
  
- | **What is Hosted Graphite?**
  | We host Graphite so you don't have to! We handle and manage your metric collection, storage, alerting, and visualization services so you can focus on more important things. Hosted Graphite provide ways for you to send us data from your infrastructure, and you can plot that data on custom dashboards that look awesome! We give you the tools that you need to send large amounts of data, and provide interesting ways for you to get accurate information back out, analyze it, alert on it, and share it. We also provide integrations with other popular services, have a wide range of account/team management options, and offer great support.
  
.. _how-is-hg-different:

- | **How is Hosted Graphite different from Vanilla Graphite?**
  | There are a lot of differences between HG Graphite and vanilla Graphite, but there are 2 which will affect users the most:
  
    - Data aggregation is automatic. In vanilla Graphite only one datapoint is saved per resolution interval, so if you want to send data more frequently you need to use some kind of pre-aggregation service, like StatsD or a Carbon Aggregator. Hosted Graphite creates Data Views for all metrics we receive, which consolidate all your datapoints like an aggregator would, but also gives you access to 9+ different versions of your aggregated metrics. Visit the :doc:`Data Views </additional/data-views>` page for a full list of all the data views you can access.

    - No 'Last Write Wins'. As mentioned above, in vanilla Graphite only one datapoint per timestamp can be stored. If a new datapoint is sent to the old timestamp, it overwrites the old value. With Hosted Graphite the new datapoint is incorporated into the data views instead.


.. index:: Open Source Graphite

- | **But could I just install the open-source version of Graphite?**
  | You could! Let's say you take some time to figure out the docs and install it somewhere, then do some tests to get data in and make sure it's giving you the right data back out. Let's say it only takes a few hours of pretty enjoyable tinkering, because we are optimists!
  |
  | That's the easy, fun part. Here's the unfun part: *at some point in the future, you're going to have to drop some other important task because your monitoring setup stops working the way you want.*

    - *Maybe* your company grows, and you need to send way more data than you originally thought and the server you picked can't handle it. Now you need to reinstall somewhere, or multiple somewheres.
    - *Maybe* someone on your team isn't getting the right answers out, and you need to help them debug it or create new dashboards.
    - *Maybe* your company releases the new version of your software, and even with your beefy new setup it swamps your monitoring. Now nobody know what's happening in production and people are looking at you like you kicked their puppy.
    - *Maybe* now you can't remember exactly what you were working on originally?
    - *Maybe* your boss is wondering why you're spending all this time maintaining the graphs instead of writing that useful new feature the customers are waiting for?
    - *Maybe* you didn't want to be the Graphite monkey, and all these problems need to just go away...

  | **That's why we're doing this - let us handle it all for you.**
  
.. index:: What is a metric?

- | **What is a Metric?**
  | A metric is a unique time-series collection of name-value data. This data is sent to us as it is sampled (or aggregated with other sampled data) and it becomes available in your account for later graphing. In other words, this means that you send us a numeric value at a certain time, and we make sure that the number gets collected properly with all the other numbers that many other servers could be sending concurrently. **Note:** we charge on the total number of unique metrics in an account, not the amount of data points it receives.

.. _faq_business:

.. index:: FAQ - Business Questions

Business
--------

.. index:: SLA

- | **Do you provide an SLA, Security Details, or keep uptime statistics?**
  | Yes. We aim for (and achieve) three nines of service availability. We're happy to give you more detailed stats upon request, `contact us <mailto:support@hostedgraphite.com>`_ for more details.

.. index:: Support

- | **What are your support options for businesses?**
  | We provide email support for all plans, and we answer quickly. For Enterprise plans and above we also offer phone and video call support. The people giving you answers are experienced engineers and are committed to giving you great service.

.. index:: Dashboard Migration

- | **Can you migrate our existing dashboards?**
  | Absolutely, its easy to import json objects into our Hosted Dashboards! Please contact `support@hostedgraphite.com <mailto:support@hostedgraphite.com>`_ and we'll talk you through the process.

.. index:: Volume Metrics

- | **We have a lot of metrics, can we get them all hosted?**
  | We have customers sending millions of metrics and we ingest billions of data points per second. If you think you're going to need a lot of metrics, we can onboard you at a pace that suits your schedule. We offer a `14-day free trial <https://www.hostedgraphite.com/accounts/signup/>`_ and if you need additional metrics or data points per second, just let us know and we will be happy to accommodate your load testing. If you have sales questions or technical queries, you can `book a demo <https://calendly.com/metricfire-sales/hostedgraphite-demo>`_ with us, and we will gladly address all of your questions.

.. index:: Backups

- | **Who owns my data? Can I get it back or get data backups?**
  | The data is yours and our Enterprise customers can even benefit from regular data backups to Amazon S3. Other accounts can get one-time whisper exports of their data sets, upon request.
  
- | **Is my data backed up?**
  | Definitely! We store 3 copies of your data, for each resolution (30s, 300s, 3600s).


.. index:: upgrade

- | **What happens if I am on an annual subscription and need to upgrade (or downgrade) mid term?**
  | Annual subscriptions are purchased in advance for the following 12 month period but if your usage increases we might need to change your plan. Plans are subject to upgrade mid-subscription in the event that metric usage exceeds the paid-for metric threshold. Any such upgrade will be advised at least 14 days in advance and you will have the option at any time to reduce your metric usage to fit within the plan you are currently on.

.. _faq_technical:

.. index:: FAQ - Technical Questions

Technical
---------

.. index:: Whisper

- | **Does Hosted Graphite use Whisper files as its back-end?**
  | No, Hosted Graphite has replaced Graphite's traditional file-based Whisper format with a compatible datastore running on `Riak <https://en.wikipedia.org/wiki/Riak>`_. This customized database allows us to easily scale up to very large amounts of metrics, while also ensuring that there are multiple (3) redundant copies of the data. Our Riak database has been optimized to handle a high cardinality and is able to read, write, and traverse data quickly and efficiently.

.. index:: Metric Transmission

- | **Does sending metrics affect the speed of my application?**
  | Sending metrics to Hosted Graphite will have a negligible impact on performance if implemented correctly. If you need to perform metric processing or aggregation before sending, consider doing this asynchronously to minimize performance impact e.g. in another thread.

.. index:: TCP vs UDP, UDP vs TCP

- | **When should I consider using TCP vs UDP?**
  | UDP is a simple way to get started as you can 'fire and forget'. However, UDP is a less reliable protocol, if you want to be sure that the message was received a TCP Connection is preferred.  If you choose TCP, we recommend that you make the connection asychronously (e.g. in another thread) to prevent network conditions from affecting performance of your system. The majority of our incoming traffic is TCP.

.. index:: Firewall whitelist IP, IP address

- | **What IP addresses should I whitelist on my firewall to reach the Hosted Graphite carbon endpoint?**
  | The carbon endpoint currently resolves to the following IP addresses:
  |
  |     136.243.95.144
  |     136.243.95.158
  |     136.243.95.165
  |     136.243.95.166
  |     138.201.149.0
  |     144.76.143.215
  |     195.201.153.19
  |     195.201.153.20
  |     94.130.127.162
  |
  | This list is correct as of August, 2022 but may change. To retrieve an up-to-date list of IP addresses, run ``nslookup carbon.hostedgraphite.com`` in a command prompt or terminal session of your choice.

.. index:: Data Resolution and Retention

- | **How long do you keep data for?**
  | Keywords: resolution, retention, aggregation, rollup
  |
  | We aggregate and store data at these resolutions:

   - 5 second data is stored for 1 day (please `contact us <mailto:support@hostedgraphite.com>`_ to request this resolution)
   - 30 second data is stored for 3 days
   - 300 second (5min) data is stored for 6 months
   - 3600 second (1hr) data is stored for 2 years

  | Depending on your query, Graphite will serve data from the most appropriate resolution.
  | For example, if you ask for the most recent 1 hour, that data will come from the 30 second resolution. If you ask for 24 hours, it'll come from the 300 second resolution, because serving 30 second data for that query would produce too much data to meaningfully display. However, if you ask for 1 hour of data from 24 hours ago, that'll go back to the 30 second resolution because of how 'zoomed in' you are. In this way we allow for a fast, meaningful overview of your data as well as detailed investigation when it becomes necessary.
  |
  | We map the following time spans to the following resolutions:
  
   - 0h-1h query displays 5s resolution data (available upon request)
   - 1h-10h query displays 30s resolution data
   - 10h-5d query displays 300s resolution data
   - 5d-2y query displays 3600s resolution data
  
  .. index:: Pre-Aggregation
  
  | In some cases, customers needing more accurate counts of occurrences can benefit from using pre-aggregation services, such as `StatsD <https://github.com/etsy/statsd#installation-and-configuration>`_ or `carbon-c-relay <https://github.com/grobian/carbon-c-relay>`_.  `Contact us <mailto:support@hostedgraphite.com>`_ if you need some advice on how to configure a pre-aggregation service.
  

.. index:: Graphite Version

- | **What version of Graphite do you offer?**
  | We offer Graphite version 1.1.1. In contrast to vanilla Graphite, our backend doesn't just keep averages - we keep the min, max, avg, sum, and observations of the data sent allowing much more detailed insight into your metrics. We also provide arbitrary percentile data for even more interesting views of your metrics. Read more about our Data Views :doc:`here </additional/data-views>`, which in some cases can be a suitable replacement for StatsD.

.. index:: Graphite tags

- | **Do you support Graphite Tags?**
  | Yes we support graphite tagging, have our own :doc:`Tag API </api/tag_api>`, and have a Tag Search UI feature so you can easily locate and manage your tagged metrics. Refer to our :doc:`Graphite Tag Support </sendingmetrics/tagged-metrics>` doc for more details.
 
Account Metrics and Limiting
----------------------------

.. index:: Metrics and Limiting, Quotas

- | **What happens if I go over the limits of my plan?**
  | If your metric limits go over the allowed number of metrics for your plan, we'll send you a friendly reminder to ask you to either delete metrics or upgrade to the next plan.
  | If your account is still over the allotted number of metrics for your plan after 7 days we'll drop you an email and your plan will be automatically upgraded. Any charges will be prorated.

.. index:: Account limits

- | **What limits are on my account?**
  | See the :doc:`Account Diagnostics </accountmanagement/account_diagnostics>` documentation for information on what limits are in place, and why.

- | **How do you handle bursty traffic?**
  | We know bursty traffic is a normal part of everyone's operations, and we don't want to penalize people for it. At the same time, we need to make sure we're billing everyone fairly.
  | If your account is storing more than 110% of the metrics allowed under your plan for 14 consecutive days, we'll send you an email and display an in-account message that we will upgrade your account soon.
  |
  | If you don't reply and if your metric usage remains above 110% of the limit, your account will be automatically upgraded to the smallest plan that your usage fits into. If that's not suitable for you, you will need to reduce the number of metrics you're storing and if you don't take action or contact us within the 14 day notice period, your subscription will automatically upgrade. You can find more information around metric management in our docs :doc:`here </sendingmetrics/metric-management>`.
  |
  | It's worth noting that we won't automatically upgrade any customer during the 14 day notice period and that we're willing to bend the rules if you just need a bit more time to reduce your usage - we know technical changes can take some time - so please talk to us and we'll be happy to work with you. Please `contact us <mailto:support@hostedgraphite.com>`_ if you want to chat about this, we'd much rather be your monitoring partner than draconian enforcers of rules!

.. index:: VMs, short-lived metrics, transient servers

- | **I spin up a lot of VMs, is this going to affect my metric limits?**
  | We can set up a metric expiry policy for metrics you know aren't going to last long. You can set an expiration of 7, 14, 21, or 30 days which will automatically delete a metric if it hasn't been updated in that time. See the documentation on :ref:`metric expiry <accountsettings_metricexpiry>` for more information.


.. index:: Java dns, dns caching, caching

- | **Is there anything I should know when I'm sending data via Java?**
  | Yes. Java can cache DNS entries indefinitely, which causes problems when we need to replace or add servers to our system.
  | Use our `Java caching guide <languageguide/lg_java.html#java-dns-behaviour>`_ to ensure your DNS behaves like a good neighbour.

.. index:: Caching

- | **Are queries to Graphite cached?**
  | Hosted Graphite uses graphite's default cache settings of 60s for metrics, data and rendered images. If you really need uncached results, add '&noCache=true' to your query string.

.. index:: Retention Policies

- | **Is it possible to control the data retention policy for my account?**
  | Not if your account is in our shared environment. Graphite's usual backend rolls up metrics and then produces an average at a different resolution, we keep unaltered data at the resolution required.

.. index:: Languages

- | **What client languages do you support?**
  | Graphite is designed to be language agnostic - as long as you have some way to send a data packet over a network via TCP or UDP, integration is very easy. We provide sample code for the following:

   - :doc:`Metric Libraries </languageguide/metric_libraries>`
   - :doc:`.NET </languageguide/lg_dotnet>`
   - :doc:`Go </languageguide/lg_golang>`
   - :doc:`Java </languageguide/lg_java>`
   - :doc:`Javascript </languageguide/lg_javascript>`
   - :doc:`Node.js </languageguide/lg_nodejs>`
   - :doc:`PHP </languageguide/lg_php>`
   - :doc:`Python </languageguide/lg_python>`
   - :doc:`Ruby </languageguide/lg_ruby>`
   - :doc:`Shell </languageguide/lg_shell>`


.. index:: FAQ - Customization

Customization
-------------
.. index:: Hosting Local Dashboards

- | **Can I host dashboards locally using Hosted Graphite as a data source?**
  | Absolutely! Follow our :doc:`guide to alternative Graphite dashboards </dashboards/other-dashboards>` to use an :doc:`access key </accountmanagement/access-keys>` that will allow you to connect to self-hosted dashboards, like Tasseo, Tattle, Graphiti, Cabot, or Seyren.
  
.. index:: Using Hosted Graphite as a Data Source

- | **Can I use Hosted Graphite metrics to send alerts to other alerting services?**
  | If you create an :doc:`access key </accountmanagement/access-keys>`, you can hook Hosted Graphite up to `Seyren <https://github.com/scobal/seyren>`_ or `Cabot <https://github.com/arachnys/cabot>`_. Both are excellent alerting frameworks that our customers enjoy.
  | There's more details in our :doc:`Alerting Guide </alerting/alerting>`.

.. index:: Heroku Add-On

- | **Can I get metrics from my Heroku Applications?**
  | Yes! We manage a Heroku Add-On and you can get dyno metrics with the HG Add-On, or with a dedicated Hosted Graphite account. A :ref:`dedicated Hosted Graphite account <existing-hg-account>` is generally a better value than the `Heroku Add-on <https://elements.heroku.com/addons/hostedgraphite>`_, as we offer higher data retention and priority support for all plan levels. 
  | See our :doc:`Integration Guide </integrationguide/index>` for a full list of services that we integrate with including Heroku, AWS, GitHub, CircleCI, Pingdom, New Relic, Papertrail, Sentry, and more!

.. index:: Team Access

- | **Is it possible to share my account with colleagues?**
  | For sure, refer to our :doc:`Team Access </accountmanagement/team-access>` docs for full details. You can invite other team members to use your account, and view your graphs. You also have the option of giving them admin, read/write, or read-only access to your account.

.. index:: Hosted StatsD

- | **Do you provide hosted StatsD?**
  | Yes, Hosted StatsD can be configured with a few clicks! We also provide :doc:`data views </additional/data-views>` which provide much of the functionality of StatsD. See our :doc:`Add-Ons and Integrations Guide </integrationguide/ig_hosted_statsd>` for more information.

.. index:: System Metrics, CPU, Load, Network IO, Disk IO

- | **How can I collect server metrics such as CPU usage, Load, Network, and Disk IO?**
  | Here's a useful guide on how to use one of our supported :doc:`agents </agents/index>` to easily collect system metrics and send them to Hosted Graphite.

.. index:: Telegraf Agent

- | **Is it possible to use an agent to collect more than just server metrics?**
  | Yes, the Telegraf agent has a wide variety of `input plugins <https://docs.influxdata.com/telegraf/v1.10/plugins/inputs/>`_ that allow you to collect system metrics from your servers, and additional metrics from many other popular services and technologies like:
    - Databases, Networks, DNS, MQTT, GCP, System Applications, Apache, Kubernetes, Jenkins, Jolokia, Elasticsearch, Logstash, Kibana, Mailchimp, Nginx, Docker, GitHub, Salesforce, and many more! Find installation instructions and more details about input plugins in our :doc:`Telegraf </agents/telegraf>` documentation.

.. index:: FAQ - Troubleshooting

Troubleshooting
---------------

- | **Why don't I see any metrics in the dashboard composer's 'Graphite' folder?**
  | Ensure that your metrics are being sent using :ref:`the correct format <metric-data-format>` and using the correct :ref:`API Key <api-key>`.

.. index:: Empty Graphs

- | **Why did I get an empty graph after adding a metric to my Primary Dashboard?**
  | If the metric appears in the folder, then it's likely one (or both) of two things have happened.

	- No data for the currently selected time window - :ref:`choose a more suitable time range <dashboardguide-daterange>`. If you're trying to test that a new metric was received, a 30 minute time range is a good choice.
	- The data is too sparse for the selected time range - try choosing the **Connected Line** graph style or enabling Graphite's `Keep Last Value <https://graphite.readthedocs.io/en/latest/functions.html#graphite.render.functions.keepLastValue>`_ function. See the :doc:`Graph Option Menu </dashboards/graphmenu>` for more info on this.

- | **Why can’t I see any graphs on my dashboard?**
  | After adding graphs to a dashboard, you must explicitly save that dashboard, giving it a name.  Then the dashboard can be recalled either via a menu or via a book-markable URL.  See the :ref:`Dashboard Guide <dashboardguide_savedash>` for more information. 

.. index:: Metric Speed, How long does it take for metrics to appear?

- | **How long does it take for metrics to appear in the system?**
  | Generally, it will take about 30 seconds for a new metric to be available in the metric tree. During slower times this might take a couple of minutes, but we try to keep it to around 30 seconds.
  |
  | The speed of new datapoints appearing for an existing metric will depend on the time scale of the graph you’re viewing.
  |
  | For a short graph timescale (e.g. within the last 24 hours) the metric will become available within a few seconds - 15 seconds at the minimum. If you’re looking at a timespan greater than 24 hours, it will take up to 10 minutes simply because each data point on a graph of that scale is represented by a larger amount of time. One data point received in that time interval is not a valid representation of the actual data stream, so data is only displayed when there is a valid amount collected.
  
- | **What are _hg_meta metrics?**
  | These metrics are used to monitor account traffic and come standard with every account. Additionally, a dashboard called 'HG Traffic Dashboard' is automatically generated to visualize these metrics. They do not count against your metric total and you are not charged for them.  

.. _faq_support:

Support
-------

.. index:: Help

- | **Where can I get further help?**
  | If you have any questions, feel free to mail `support@hostedgraphite.com <mailto:support@hostedgraphite.com>`_ and one of our team members will get back to you quickly. You can also start a conversation with our team by logging into your HG account and clicking on the chat bubble on the bottom-right of your screen. 
  
- | Do you have questions that were not answered in our documentation? Feel free to book a demo with us `here <https://calendly.com/metricfire-sales/hostedgraphite-demo>`_, and we will be happy to have a conversation with you and address any questions about our product and services.




