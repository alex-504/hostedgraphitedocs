New Relic
=========

Hosted Graphite provides an add-on for New Relic. This service will sync your metrics from New Relic into your Hosted Graphite account. These metrics are aggregated upon ingestion to Hosted Graphite and the naming schemes could differ from the naming schemes in your new Relic account.

We currently support syncronization of metrics from two New Relic services.

 - `APM <http://newrelic.com/application-monitoring>`_
 - `Browser <http://newrelic.com/browser-monitoring>`_

To get this service running, browse to our `add-ons <https://www.hostedgraphite.com/app/addons/>`_ page. Here you will find the "New Relic Metric Import" card. Enter your New Relic access key into the textbox provided, then click the "Save" button.

You can also choose which "instances/apps" from New Relic you would like to import, this can be enabled via the "custom" button found on the same card (only after you have saved an API Key).

You have two options for importing metrics from New Relic. You can choose to either import "summary" metrics or "all" metrics. Summary metrics are used to build the default dashboards you see for APM/Browser within your New Relic account and also the ones which we use to populate our automatic-dashboards.

Once enabled, wait a few minutes and your New Relic summary metrics should start appearing in your account under the following metric paths:
- "newrelic.apm.<appName>"
- "newrelic.browser.<appName>"

We will also create some New Relic dashboards in your account, these are named:
- New Relic APM
- New Relic Browser Overview


Importing all metrics:
------------------------

When you enable "all" metric imports for New Relic, a greater range of metrics will be pulled for each app/service. These metrics will appear under the path: "newrelic.{apm|browser}.<appName>.all.<metrics>"

Importing *all* metrics will result in a large increase in your metric count, so we recommend ensuring your account plan is large enough to deal with 1000s of new metrics per New Relic instance/app. If not, please consider upgrading to a larger plan.

If you do have "all" importing enabled, it is important to note that for apm services on New Relic, a "browser" instance is created per app, these metrics automatically get pulled in under the newrelic.apm.verbose.<appName>.browser path and therefore will not be duplicated under newrelic.browser.verbose.<appName>
