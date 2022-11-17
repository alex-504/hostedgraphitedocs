.. _hg-alerts_api:


Alerts API
==========

.. index:: Alerts API

.. contents:: Table of Contents
   :depth: 2

Creating Alerts
---------------

``POST /v2/alerts/``

**Curl example:**
::

  curl -H "Content-Type: application/json" -X POST -d \
  '{"name": "alert1", "metric": "test.metric.1", "alert_criteria": {"type": "above", "above_value": 5, "time_period": 2}}' \
  "https://YOUR-API-KEY@api.hostedgraphite.com/v2/alerts/"

Creates an alert named ``alert1`` for metric ``test.metric.1`` that triggers if the value is above 5 for 2 minutes with the (default) ``Email me`` notification type.

**Request format**:

.. code-block:: javascript

 {
   "name": "string",
   "metric": "string",
   "alert_criteria":
     {
       "type": "above" | "below" | "outside_bounds" | "missing",
       "above_value": 123,
       "below_value": 123,
       "time_period": 123,
     },
   "additional_criteria":
     {
      "b":
        {
         "type": "above" | "below" | "outside_bounds" | "missing",
         "above_value": 123,
         "below_value": 123,
         "time_period": 123,
         "metric": "string"
        }
     },
   "expression": "a && b",
   "scheduled_mutes": ["scheduled_mute_id1", "scheduled_mute_id2", "scheduled_mute_id3"],
   "notification_channels": ["channel_id1", "channel_name1", "channel_id2"],
   "notification_type": "state_change" | ["state_change"] | ["every", 123],
   "info": "string",
   "on_query_failure": null | "ignore" | "notify"
 }

**Parameters**:

- | **name**
  | **[REQUIRED]**
  | A name that uniquely identifies this alert.
- | **metric**
  | **[REQUIRED]**
  | The graphite metric query to alert on.
- | **alert_criteria**
  | **[REQUIRED]**
  | The criteria for which the alert triggers.
- | **type**
  | **[REQUIRED]**
  | The alert type, valid values are ``above``, ``below``, ``outside_bounds`` and ``missing``.
- | **additional_criteria**
  | Any extra metrics that are to be included when evaluating the state of an alert, these are referred to as **Composite Alerts**. Note that any additional criteria must be referenced in the expression field and a maximum of 3 additional criteria is allowed. Example: ``{"f": {"type": "above", "above_value": 5, "metric": "additional.metric.to.alert.on"}`` where ``f`` is also referenced in the ``expression`` field. Defaults to ``{}``.
- | **expression**
  | A conditional relationship between multiple metrics. It allows for the combining of multiple alert criteria. It's represented in the format of a boolean expression where each individual alert criteria is denoted as a single letter. The letter ``a`` is reserved for the criteria defined in ``alert_criteria``.
  | Only required when additional alerting criteria are defined. Maximum number of 3 additional criteria allowed (4 including the default alert criteria). ``&&`` takes higher precedence over ``||`` Examples: ``a && b``, ``a || c``. Defaults to ``a``.
- | **above_value**
  | The value above which the alert should trigger. Required for alert type ``above`` and ``outside_bounds``.
- | **below_value**
  | The value below which the alert should trigger. Required for alert type ``below`` and ``outside_bounds``.
- | **time_period**
  | The time period in minutes for which the threshold needs to be breached. Leave empty for an instantaneous evaluation. Required for alert type ``missing``.
- | **scheduled_mutes**
  | List of scheduled mutes for this alert. Must be a list of scheduled mute IDs. Defaults to an empty list. 
- | **notification_channels**
  | List of notification channels for this alert. This can be a combination of channel names and channel IDs. Defaults to ``Email me`` if none exists.
- | **notification_type**
  | The type of notification interval for this alert. Options are  ``state_change`` (``['state_change']`` or ``'state_change'`` is valid) or ``['every', time_in_minutes]``. This lets you control how often you want to be notified for an alert. Defaults to ``['every', 60]`` if empty.
- | **info**
  | Alert message sent with notifications. Can contain an arbitrary string which may contain a description of the alert, steps to follow or references to documentation.
- | **on_query_failure**
  | Controls if a notification is delivered if the graphite function query fails. Only valid for Alerts that have graphite function in the metric field. Defaults to notify. Graphite function query can fail due to timeouts from matching too many metrics, being malformed or if it returns duplicate metrics due to aliasing.


**Alert criteria examples:**

Create an alert that triggers if the metric is missing for 10 minutes.

.. code-block:: javascript

  "alert_criteria": {
    "type": "missing",
    "time_period": 10
  }

Create an alert that triggers if the metric is above 5.6 ever.

.. code-block:: javascript

  "alert_criteria": {
    "type": "above",
    "above_value": 5.6
  }

Create an alert that triggers if the metric is below 2.1 or above 5.6 ever.

.. code-block:: javascript

  "alert_criteria": {
    "type": "outside_bounds",
    "above_value": 5.6,
    "below_value": 2.1
  }

Create an alert that triggers if the metric is below 2.1 or above 5.6 for 10 minutes.

.. code-block:: javascript

  "alert_criteria": {
    "type": "outside_bounds",
    "above_value": 5.6,
    "below_value": 2.1,
    "time_period": 10
  }

**Response format**:

  .. code-block:: javascript

   HTTP/1.1 201
   Content-Type: application/json

   {
     "id": "<alert_id>",
     "url": "/v2/alerts/<alert_id>"
   }

**Parameters**:

  - | **id**
    | An id that uniquely identifies this alert.
  - | **url**
    | URL endpoint that can used to perform actions on this alert.


**Status Codes:**

  - **201** - Created
  - **400** - Invalid format.
  - **409** - Alert with the name already exists.
  
  
Composite Alerts
++++++++++++++++

Composite alerts can evaluate multiple metrics and values and are defined in the "additional_criteria" and "expression" parameters in the request format.

Create an alert when one metric is above 80 and another is below 20.

.. code-block:: javascript

  "metric": "my.first.metric",
  "alert_criteria": {
    "type": "above",
    "above_value": 80
  },
  "additional_criteria": {
    "b": {
      "type": "below",
      "below_value": 20,
      "metric": "my.second.metric"
    }
  },
  "expression": "a && b",

Create an alert when one metric is below 50 or another is below 30.

.. code-block:: javascript

  "metric": "my.first.metric",
    "alert_criteria": {
      "type": "above",
      "above_value": 50
    },
    "additional_criteria": {
      "c": {
        "type": "below",
        "below_value": 30,
        "metric": "my.second.metric"
      }
    },
    "expression": "a || c"

Create an alert when one metric (A) is below 50 and another (B) is above 60 or if a third (C) is above 120. Note that performing an && on two monitors gets preference over || so this alert expression will be evaluated as (A && B) || C

.. code-block:: javascript

  "metric": "my.first.metric",
  "alert_criteria": {
    "type": "below",
    "below_value": 50
  },
  "additional_criteria": {
    "b": {
      "type": "above",
      "above_value": 60,
      "metric": "my.second.metric"
    },
    "c": {
      "type": "above",
      "above_value": 120,
      "metric": "my.third.metric"
    }
  },
  "expression": "A && B || C"


**Note:**
- Our UI doesn't fully support composites. As a result, composite alerts cannot be edited via the UI - it needs to be done via the API. 
- The alert overview page (when you click the eye button on an alert), will only display **one** metric for the alert instead of all the metrics associated. However the alert notifications are working and will display the graph of the last metric that breached the alert threshold. So for example, if the alert is ``a && b``, and ``a`` breaches the threshold, then a few minutes later ``b`` breaches it's threshold, the alert notification will show the metric graph for ``b``.


Searching Alerts
----------------

``GET /v2/alerts/?`` - Returns a JSON object containing information on alerts matching the search query. Returns all the alerts if the parameter is left empty.

**Curl example:**
::

   curl -X GET "https://YOUR-API-KEY@api.hostedgraphite.com/v2/alerts/?"


Available Parameters (default values in brackets):

- | **name**
  | Format: &name=<alert_name1>&name=<alert_name2>
  | The alert name to search for. Can specify multiple alert names to search for more than 1. Performs an OR operation so a query such as ``&name=<alert_name1>&name=<alert_name2>`` will return info on both alert_name1 and alert_name2
- | **id**
  | Format: &id=<id1>&id=<alert_id2>
  | The alert id to search for. Can specify multiple ids to search for more than 1. Performs an OR operation so a query such as ``&id=<alert_id1>&id=<alert_id2>`` will return info on both alert_id1 and alert_id2.
- | **search**
  | Format: &search=<search_string>
  | A more generic search that will match any alert whose alert name, metric name or notification channel name contains the search string.
- | **page** (1)
  | Format: &page=1
  | The page number to query. Used if there are more alerts than can be displayed in a single request.
- | **max** (100)
  | Format: &max=50
  | The maximum number of alerts to display. Limit of 100.

Specifying both alert_name and alert_id performs an ``OR`` operation and returns alert that match either criteria. Including a search string performs an ``AND`` operation with the other criteria.

**Response format**:

.. code-block:: javascript

    HTTP/1.1 201
    Content-Type: application/json

    {
      "alerts": [
      	{
      	"name": "Name of the alert",
        "id": "unique id of the alert",
      	"alert_criteria": {
          "type": "type of alert",
          "above_value": 123,
          "below_value": 123,
          "time_period": 123
        }
        "notification_channels": ["<list of channel ids>"],
        "notification_type": ["state_change" ] | ["every", 123],
        "scheduled_mutes": ["<list of scheduled mute ids"],
        "currently_triggered_metrics": [] | ["List of metrics that triggered the alert."],
        "muted": True |  False,
        "status": "alerting" | "healthy",
        "info": "alert info" | null,
        "on_query_failure": null | "notify" | "ignore"
       }
      ]
      "next_page": False | page number
    }

**Status Codes:**

 - **200** - OK
 - **400** - Invalid form data

Obtain Information on a Single Alert
------------------------------------

``GET /v2/alerts/<alert_id>/`` - Returns information on a single alert.

**Curl example:**
::

  curl -X GET "https://YOUR-API-KEY@api.hostedgraphite.com/v2/alerts/123-456-7890/"

Obtain information on the alert identified by the id ``123-456-7890``. The alert id can be found in the URL of the alert when viewed from within the Hosted Graphite Alerts UI.

**Alert response format**:

.. code-block:: javascript

    HTTP/1.1 200
    Content-Type: application/json

    {
    	"name": "Name of the alert",
    	"id": "unique id of the alert",
    	"alert_criteria": {
        "type": "type of alert",
        "above_value": 123,
        "below_value": 123,
        "time_period": 123
      },
      "expression": "a",
      "notification_channels": ["<list of channel ids>"],
      "scheduled_mutes": ["<list of scheduled mute ids>"],
      "currently_triggered_metrics": [] | ["List of metrics that triggered the alert."],
    	"notification_type": ["state_change" ] | ["every", 123],
    	"muted": True |  False,
    	"status": "alerting" | "healthy",
      "info": "alert info" | null,
      "on_query_failure": null | "notify" | "ignore"
    }

**Status Codes:**

 - **200** - OK
 - **404** - Alert doesn't exist.

Updating Alerts
---------------

``PUT /v2/alerts/<alert_id>/`` - Update attributes of an alert identified by the alert id.

**Curl Example**
::

  curl -H "Content-Type: application/json" -X PUT -d \
  '{"alert_criteria": {"time_period": 3, "type": "below", "below_value": 6}}' \
  "https://YOUR-API-KEY@api.hostedgraphite.com/v2/alerts/123-456-789/"

Modify the alert identified by the id ``123-456-789`` to alert if the metric values are below 6 for 3 minutes.

**Request format**:

.. code-block:: javascript

 {
   "name": "string",
   "metric": "string",
   "info": "string",
   "alert_criteria":
     {
       "type": "above" | "below" | "outside_bounds" | "missing",
       "above_value": 123,
       "below_value": 123,
       "time_period": 123
     },
   "scheduled_mutes": ["scheduled_mute_id1", "scheduled_mute_id2", "scheduled_mute_id3"],
   "notification_channels": ["channel_id1", "channel_id2", "channel_id3"],
   "notification_type": "state_change" | ["state_change"] | ["every", X],
 }

Each field is optional and only the specified fields are updated.

**Status Codes:**

 - **200** - OK
 - **400** - Invalid form data.
 - **404** - Alert doesn't exist.

Deleting Alerts
---------------

``DELETE /v2/alerts/<alert_id>/`` - Update an alert identified by the alert id.

**Curl Example**
::

  curl -X DELETE "https://YOUR-API-KEY@api.hostedgraphite.com/v2/alerts/123-456-789/"

Delete the alert identified by the id ``123-456-789``.

**Status Codes:**

 - **200** - OK
 - **404** - Alert doesn't exist.


Mute an Alert
-------------

``POST /v2/alerts/<alert_id>/muted/`` - Mute alerts identified by the alert id.

**Curl Example**
::

  curl -H "Content-Type: application/json" -X POST -d '{"duration":60}' \
  "https://YOUR-API-KEY@api.hostedgraphite.com/v2/alerts/123-456-789/muted/"

Mute the alert identified by the id ``123-456-789`` for 60 minutes.

**Request format**:

.. code-block:: javascript

    HTTP/1.1 200
    Content-Type: application/json

    {"duration": 60}

**Parameters**:

- | **duration**
  | **[REQUIRED]**
  | Time to mute in minutes.

**Status Codes:**

 - **200** - OK
 - **404** - Alert doesn't exist.
 - **400** - Invalid form data.


Unmute an Alert
---------------

``DELETE /v2/alerts/<alert_id>/muted/`` - Unmute an alert identified by the alert id.

**Curl Example**
::

  curl -X DELETE "https://YOUR-API-KEY@api.hostedgraphite.com/v2/alerts/123-456-789/muted/"

Unmute the alert identified by the id ``123-456-789```.

**Status Codes:**

 - **200** - OK
 - **404** - Alert doesn't exist.


Check if an Alert is Muted
--------------------------

``GET /v2/alerts/<alert_id>/muted/`` - Get the mute status of an alert identified by the alert id.

**Curl Example**
::

  curl -X GET "https://YOUR-API-KEY@api.hostedgraphite.com/v2/alerts/123-456-789/muted/"

Obtain information on the mute status of the alert identified by the id ``123-456-789``. Also provides a list of the scheduled mutes currently attached to the alert.

**Response format**:

.. code-block:: javascript

  HTTP/1.1 200
  Content-Type: application/json

 {
  "id": "alert_id",
  "name": "alert_name",
  "muted": True |  False,
  "duration": Remaining time in minutes,
  "scheduled_mutes": ["<list of scheduled mute ids>"]
 }

**Status Codes:**

 - **200** - OK
 - **404** - Alert doesn't exist.

Mute Multiple Alerts
--------------------

``POST /v2/alerts/muted/`` - Mute multiple alerts.

**Curl examples:**
::

  curl -H "Content-Type: application/json" -X POST -d '{"ids": ["123-456-789", "321-654-987"], "duration":60}' \
  "https://YOUR-API-KEY@api.hostedgraphite.com/v2/alerts/muted/"

Mute alerts ``123-456-789`` and ``321-654-987`` for 60 minutes.

::

  curl -H "Content-Type: application/json" -X POST -d '{"search": "search_string", "duration":60}' \
  "https://YOUR-API-KEY@api.hostedgraphite.com/v2/alerts/muted/"

Mute alerts with alert name, metric name or notification channel name containing ``search_string`` for 60 minutes.

**Request format**:

.. code-block:: javascript

    HTTP/1.1 200
    Content-Type: application/json

    {"ids": ["alert_id1", "alert_id2"],
     "duration": 60}

.. code-block:: javascript

    HTTP/1.1 200
    Content-Type: application/json

    {"search": "search_string",
     "duration": 60}

**Parameters**:

- | **ids**
  | List of alert ids to mute.
- | **search**
  | String to filter alerts. Every alert with an alert name, metric name, or notification channel name containing this string will be muted.
- | **duration**
  | **[REQUIRED]**
  | Time to mute in minutes.

If both ``ids`` and ``search`` are empty, then **all** alerts will be muted.

**Status Codes:**

 - **200** - OK
 - **400** - Invalid request
 - **404** - Alert doesn't exist.

Unmute Multiple Alerts
----------------------

``DELETE /v2/alerts/muted/`` - Mute multiple alerts.

**Curl examples:**
::

  curl -H "Content-Type: application/json" -X POST -d '{"ids": ["123-456-789", "321-654-987"]}' \
  "https://YOUR-API-KEY@api.hostedgraphite.com/v2/alerts/muted/"

Unmute alerts ``123-456-789`` and ``321-654-987``.

::

  curl -H "Content-Type: application/json" -X POST -d '{"search": "search_string"}' \
  "https://YOUR-API-KEY@api.hostedgraphite.com/v2/alerts/muted/"

Unmute alerts with alert name, metric name or notification channel name containing ``search_string``.

**Request format**:

.. code-block:: javascript

    HTTP/1.1 200
    Content-Type: application/json

    {"ids": ["alert_id1", "alert_id2"]}

.. code-block:: javascript

    HTTP/1.1 200
    Content-Type: application/json

    {"search": "search_string"}

**Parameters**:

- | **ids**
  | List of alert ids to unmute.
- | **search**
  | String to filter alerts. Every alert with an alert name, metric name, or notification channel name containing this string will be unmuted.

If both ``ids`` and ``search`` are empty, then **all** alerts will be unmuted.

**Status Codes:**

 - **200** - OK
 - **400** - Invalid request
 - **404** - Alert doesn't exist.

Obtain Alert History
--------------------

``GET /v2/alerts/history/?`` - Obtain the alert history.

**Curl example:**
::

  curl -X GET "https://YOUR-API-KEY@api.hostedgraphite.com/v2/alerts/history/?id=123-456-789

Obtain alert history of the alert identified by the id ``123-456-789``.

Available Parameters (default values in brackets):

- | **id**
  | The alert id to search for. Can specify multiple ids to search for more than 1. Returns history of all alerts if empty
  | Format: &alert_id=<alert_id1>&alert_id=<alert_id2>
- | **days** (3)
  | The number of days to obtain history of.
  | Format: &days=1


**Response format**:

.. code-block:: javascript

  HTTP/1.1 200
  Content-Type: application/json

  {
    {"<alert_id_1>": [{
        "status": "alerting" | "recovered",
        "value": null | 123,
        "time": "unix_timestamp",
        "metric": "The metric that triggered this."
        },],
    }
    {"<alert_id_2>": [{
        "status": "alerting" | "healthy",
        "value": null | 123,
        "time": "unix_timestamp",
        "metric": "The metric that triggered this."
        },],
    }
  }

- | **status**
  | The status that was recorded. Cant be either 'alerting' or 'recovered'.
- | **value**
  | The value at which the alert triggered or recovered. Value will be null if the alert was a missing metric alert.
- | **time**
  | Unix timestamp at which the alert triggered or recovered.

**Status Codes:**

- **200** - OK
- **400** - Invalid query parameters

.. raw:: html

    <script src="../_static/api_cluster.js"></script>
