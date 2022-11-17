.. _hg-alerting:

Alerting Overview
=================

.. index:: Alerting

.. contents::

Alerts allow you to receive a notification when your data does something unexpected, such as go above or below a set threshold, or stops suddenly. Select a recipient for your notifications and you can get immediate feedback via email, PagerDuty, or Slack when critical changes occur.

 - | **We highly recommend creating your alerts within the Hosted Graphite UI, not the Primary Dashboard UI** - Alerts built within the dashboard UI may not have the expected affect in our system. Our internal alerting system also has a quicker response time because it is triggered from values upon ingestion, rather than upon render.


Alert States
------------

Your alerts are listed in the `Alert Overview <https://www.hostedgraphite.com/app/alerts/>`_ section of the Hosted Graphite application. We list them in four categories:

  - | **Healthy Alerts**
    | Alerts that are currently running and within acceptable boundaries.
  - | **Triggered Alerts**
    | Alerts that are currently running and outside acceptable boundaries, this alert will have already notified you via the set notification channel.
  - | **Muted Alerts**
    | Alerts which have been silenced manually or by schedule. These alerts will not notify you until they become active again.
  - | **Inactive Alerts**
    | Alerts that use graphite function metrics but have failed due to the query taking taking too long, being malformed or returning duplicate metrics due to aliasing.

You can click on the metric name to see a recent graph of that metric. The pencil icon or clicking on the alert name opens up the edit alert dialog. The mute icon allows you to silence the alert for a certain amount of time.

.. figure:: /docimg/alerts/alert_overview.png
   :scale: 80%
   :alt: Alert Overview
   :align: center

   Alert Report Page

Creating An Alert
-----------------

Alert Name and Metric
~~~~~~~~~~~~~~~~~~~~~

From within your Hosted Graphite account, click the "Alert" icon open the alert creation panel.

  - | **Name**
    | This name is used in notifications. It is a reminder of why you added it, so make it clear and descriptive! e.g. "European Servers CPU usage".

  - | **Metric Pattern**
    | This is the data that is tested against your criteria (which you'll add on the next screen) e.g. "my.server.cpu".

  - | **Alert Info**
    | Alert message sent with notifications. Can contain arbitrary string which may contain a description of the alert, steps to follow or references to documentation.

You can check a graph of your desired metric with the "Check Metric Graph" button. When you're finished, click on "Confirm Metric Choice" to proceed to the Alert Criteria screen.

.. figure:: /docimg/alerts/alert_add_metric.gif
  :scale: 80%
  :alt: Adding an Alert
  :align: center

  Set the Alert Name and Metric

Alert Criteria Panel
~~~~~~~~~~~~~~~~~~~~
There are three ways to define the criteria that will result in a notification being sent.

- | **Outside of Bounds**
  | An alert notification will be sent if the metric data you've selected goes either above the "above" threshold, or below the "below" threshold. This is useful when your data fits inside an expected range, e.g. a response time of a webserver
- | **Below / Above a Threshold**
  | If you just enter one of the above or below values, it will check whichever one you use. This is useful when there's an upper or lower bound that this data should not cross, for example the CPU load of a server.
- | **Missing**
  | An alert notification will be sent to you if the metric does not arrive at all for a certain time period. This is useful for detecting when a system goes down entirely.

The section "If the query fails" lets you control you control the behavior if the graphite function query fails. This option only appears for alerts that use graphite functions as part of their metrics.
Graphite function query can fail due to timeouts from matching too many metrics, being malformed or if it returns duplicate metrics due to aliasing.

- | **Notify me**
  | A notification is sent when the query fails with description of the reason.
- | **Ignore**
  | Notifications are ignored but the alert still changes state and the failure is visible in the event history log.

Alerting Notification Interval lets you control how often you want to be notified for an alert.

- | **On state change**
  | A notification will be sent only when the alert transitions state from healthy to triggered or vice versa. An alert that that continues alerting will not sent subsequent notifications.
- | **Every**
  | A notification will be sent when the alert triggers and recovers. Subsequent notifications will then be paused for the configured time period. This allows you to stop ‘flapping’ behavior that would give you lots of notifications in a short period of time.

.. figure:: /docimg/alerts/alert_add_criteria.gif
   :scale: 80%
   :alt: Alert Criteria
   :align: center

   Set the Alert Criteria and Select your Notification Channel


Managing An Alert
-----------------

From the Alert Overview page, you can hover your mouse over an individual alert to see actions related to managing it.

.. figure:: /docimg/alerts/alert_hover.gif
  :scale: 80%
  :alt: Editing an Alert
  :align: center

- | **View an Alert**
  | Click the eye icon to open the overview popup for an alert. This displays an embedded graph and a history log of the last 3 days of data. There is also a link to the dashboard composer allowing you to view more detailed information on the metric being alerted on. From within the dashboard composer view, alert events will be displayed as annotations. You can hover over the base of the annotation to see the details of the alerting event.

  .. figure:: /docimg/alerts/alert_overview_modal.png
    :scale: 80%
    :alt: Alert Overview
    :align: center
    
- | **Edit an Alert**
  | An alert can be edited to change its metric, criteria, or notification channel and changes may take several minutes to take effect. Updating alert criteria will place it back into the 'Healthy' list in the Graphite Alerts UI, but does not change the state of the alert.
- | **Mute an Alert**
  | An alert can be silenced from notifying you for a specified time period. Currently the available times are 30 mins, 6hrs, 1 day and 1 week.
- | **Delete an Alert**
  | An alert can be deleted from your panel here and this action is irreversible. If an alert was built within the Dashboard UI, you will be unable to edit or delete it from within the Hosted Graphite UI. Feel free to contact our `support <mailto:support@hostedgraphite.com>`_ for advice on managing alerts using the Hosted Graphite :doc:`alert API </alerting/alerts_api>`, or the `Dashboard API <https://grafana.com/docs/grafana/v7.5/http_api/alerting/>`_.

.. _alerting_notification-channels:

Notification Channels
---------------------

Defining a notification channel allows you to receive notifications when an alert triggers. Currently we support six different ways to notify your team when an event occurs. You can see the available notification channels and add new ones on the `Notification Channel Page <https://www.hostedgraphite.com/app/alerts/notification-channels/>`_.

- | **Email**
  | Send one or multiple emails to your team when the alert is triggered.
- | **PagerDuty**
  | The PagerDuty notification uses an integration key, which you can find at the `PagerDuty documentation <https://support.pagerduty.com/hc/en-us/articles/202830340-Creating-a-Generic-API-Service>`_.
- | **Slack**
  | Send an immediate notification to a Slack channel. The Slack notification requires an endpoint for your channel, see the `Slack documentation <https://slack.com/apps/new/A0F7XDUAZ-incoming-webhooks>`_ for details.
- | **OpsGenie**
  | Notify your team with OpsGenie. You will need a `Hosted Graphite integration API key <https://app.opsgenie.com/integration#/edit/HostedGraphite/>`_ from OpsGenie. Remember to 'Save Integration' after copying the API key.
- | **VictorOps**
  | (Now owned by Splunk) Send your alerts into your VictorOps hub to integrate with all your existing monitoring and alerting infrastructure.
- | **Webhook**
  | Allows you to configure your own webhook that we will notify with real-time information on your defined alerts.

**The notification will be json encoded in the following format:**

.. code-block:: javascript

    {
     "name": "The name of the triggered alert.",
     "criteria": "The defined alert criteria for the alert.",
     "graph": "PNG of the rendered graph.",
     "value": "The current value of the metric.",
     "metric": "The name of the metric.",
     "status": "The current status of the metric.",
     "backoff_minutes": false | 123,
     "info": null | "Info saved with the alert."
    }


Scheduled Mutes
---------------

Defining a scheduled mute allows you to silence alerts on a one-time or recurring basis for scheduled maintenance or downtime. You can see the available scheduled mutes and add new ones in the `Alerts UI <https://www.hostedgraphite.com/app/alerts/scheduled-mutes/>`_. 

Once a scheduled mute is created, it must be attached to alerts so that they may be silenced by the scheduled mute - this can be done at the alert `create <https://www.hostedgraphite.com/docs/alerting/alerts_api.html#create-alerts>`_ and `update <https://www.hostedgraphite.com/docs/alerting/alerts_api.html#updating-alerts>`_ endpoints, or the Hosted Graphite `UI <https://www.hostedgraphite.com/app/alerts/scheduled-mutes/>`_. 

- | **One-time**
  | You can silence alerts on a one-time basis by creating a scheduled mute with no repeat days.
- | **Recurring**
  | By providing a list of days of the week for the scheduled mute to repeat, you can silence alerts on a recurring basis.

Troubleshooting Your Alerts
---------------------------

Please contact `support <mailto:support@hostedgraphite.com>`_ if you think you've found a bug, or have any questions, concerns, or suggestions.

 - | **Is your metric arriving?**
   | If are not receiving notifications as expected, please check the `Alert Overview <https://www.hostedgraphite.com/app/alerts/>`_ page and select the alert in question. You can use this to check the metric values for the last few hours are as expected. You can also inspect the Alert History for any recent alerting events.
 - | **Are some events being ignored?**
   | We alert on a 30 second resolution. This means the finer data (5 second for example) is averaged and we alert off the 30 second aggregate.
 - | **Is your alert not triggering as expected?**
   | Alerts built within the Primary Dashboard UI will not work as expected, a simple fix could be recreating this alert in the Hosted Graphite UI. 
 - | **Is your alert not resolving as expected?**
   | Graphite alerts cannot trigger or resolve from `null` data. Try wrapping your alerting metric in a Graphite function like `transformNull() <https://graphite.readthedocs.io/en/latest/functions.html?highlight=transformNull#graphite.render.functions.transformNull>`_ or `keepLastValue() <https://graphite.readthedocs.io/en/latest/functions.html?highlight=keeplast#graphite.render.functions.keepLastValue>`_.
 - | **Is your alert not resolving after updating the criteria?**
   | An alert's state is not changed after the criteria is updated. So while your alert might move to the 'healthy' list in our UI, it will remain in a triggered state until new data resolves the alert naturally. If you are looking to quickly resolve an alert by updating the criteria, you could simply delete and recreate the alert.
 - | **Is your alert triggering but not sending Slack notifications?**
   | Check the 'alert description' field on the alert configuration. If the description contains a double quotation character ("example"), this could malform the json payload of the Slack webhook and cause the request to return an error. Test your webhook with the following command: 
   
.. code-block:: none

   curl -X POST -H 'Content-type: application/json' --data '{"text":"Hello, World!"}' <your-slack-webhook-url>
