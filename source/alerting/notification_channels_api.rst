.. _hg-notification_channels_api:

===========================================
Notification Channels API
===========================================

.. index:: Notification Channels API

.. contents:: Table of Contents
   :depth: 2

Creating notification channels
------------------------------

``POST /v2/notifications/``

**Request format**:

.. code-block:: javascript

  HTTP/1.1 200
  Content-Type: application/json

  {
    "type": "email" | "pagerduty" | "slack" | "webhook" | "victorops" | "opsgenie",
    "description": "Descriptive name for channel",
    "destination": "Destination key of the channel.",
    "auto_resolve": True | False
  }


**Curl example**
::

  curl -H "Content-Type: application/json" -X POST -d \
  '{"type": "email", "description": "A test notification", "destination": "email@example.com"}' \
  "https://YOUR-API-KEY@api.hostedgraphite.com/v2/notifications/"


**Parameters**:

- | **type**
  | **[REQUIRED]**
  | The type of notification channel to create.
- | **description**
  | **[REQUIRED]**
  | A name for the channel.
- | **destination**
  | **[REQUIRED]**
  | The destination for the notification. ie the email addreass for `email`, slack webhook url for `slack` etc.
- | **auto_resolve**
  | Only used by VictorOps and PagerDuty channels. Defaults to `false`. More info `here <alerting.html#notification-channels>`_.

**Response format**:

.. code-block:: javascript

 HTTP/1.1 201
 Content-Type: application/json

 {
   "id": "id",
   "url": "/v2/notifications/<notification_id>"
 }

**Parameters**:

- | **id**
  | An id that uniquely identifies this notification.
- | **url**
  | URL endpoint that can used to identify and manipulate this notification.

**Status Codes:**

- **201** - Created
- **404** - Invalid form data.
- **409** - Channel with the description already exists.


Searching notification channels
-------------------------------

``GET /v2/notifications/?query`` - Returns a JSON object containing information on notification channels matching the search query. Returns all the notifications if the parameter is left empty.

**Curl example:**
::

  curl -X GET "https://YOUR-API-KEY@api.hostedgraphite.com/v2/notifications/?type=email&type=slack"

Specifying multiple fields performs an ``OR`` operation and returns notifications that match either criteria.

Available query parameters (default values in brackets):

- | **type**
  | Format: &type=<type_1>&type=<type_2>
  | The notification type to search for. Can specify multiple types to search for more than 1.
- | **description**
  | Format: &descriptions=<descriptions_1>&descriptions=<descriptions_2>
  | The descriptions to search for. Can specify multiple description to search for more than 1.
- | **id**
  | Format: &id=<id_1>&id=<id_2>
  | The notification id to search for. Can specify multiple ids to search for more than 1.
- | **page** (1)
  | Format: &page=1
  | The page number to query. Used if there are more items than can be displayed in a single request.
- | **max** (100)
  | Format: &max=50
  | The maximum number of items to display. Limit of 100.

**Response format**:

.. code-block:: javascript

 HTTP/1.1 200
 Content-Type: application/json

 {
  "notifications": [
   {
   "type": "email" | "pagerduty" | "slack" | "webhook" | "victorops" | "opsgenie",
   "destination": "The destination for the notification",
   "description": "Descriptive name for channel",
   "id": "notification channel id",
   "auto_resolve": True | False
   }
  ]
  "next_page": False | page number
 }

**Parameters**:

- | **notifications**
  | List of notifications formatted in the following.
- | **page**
  | URL endpoint that can used to perform actions on this notification.


**Status Codes:**

- **200** - OK
- **400** - Invalid form data.

**Notes**

- | auto_resolve is for use with VictorOps and PagerDuty channels only.

Obtain information on a single notification
-------------------------------------------

``GET /v2/notifications/<notification_id>/`` - Returns a single notification identified by the notification id.

**Curl example**
::

  curl -X GET "https://YOUR-API-KEY@api.hostedgraphite.com/v2/notification/123-456-789/"

Obtain information of the notification channel identified by the id ``123-456-789``.

**Response format**:

.. code-block:: javascript

  HTTP/1.1 200
  Content-Type: application/json

  {
    "type": "email" | "pagerduty" | "slack" | "webhook" | "victorops" | "opsgenie",
    "description": "Descriptive name for channel",
    "destination": "Destination key of the channel."
    "id": "notification channel id",
    "auto_resolve": True | False
  }

**Status Codes:**

- **200** - OK
- **404** - Notification doesn't exist.

**Notes**

- | auto_resolve is for use with VictorOps and PagerDuty channels only.

Updating notification channels
------------------------------

``PUT /v2/notifications/<notification_id>/`` - Updates a notification channel identified by the notification id.

**Curl Example**
::

  curl -H "Content-Type: application/json" -X PUT \
   -d '{"destination": "new_email@example.com"}' \
  "https://YOUR-API-KEY@api.hostedgraphite.com/v2/notifications/123-456-789/"

Updates the destination of notification ``123-456-789``.

**Request format**:

.. code-block:: javascript

  {
    "type": "email" | "pagerduty" | "slack" | "webhook" | "victorops" | "opsgenie",
    "description": "descriptive name for channel",
    "destination": "Destination key of the channel.",
    "auto_resolve": True | False
  }

Each field is optional and only the specified fields are updated.

**Status Codes:**

 - **200** - OK
 - **400** - Invalid form data.
 - **404** - Alert doesn't exist.
 - **409** - Notification channel with the description already exists.

**Notes**

- | auto_resolve is for use with VictorOps and PagerDuty channels only.

Deleting notification channels
------------------------------

``DELETE /v2/notifications/<notification_id>/`` - Deletes a notification channel identified by the notification id.

**Curl Example**
::

  curl -X DELETE "https://YOUR-API-KEY@api.hostedgraphite.com/v2/notifications/123-456-789/"

Delete the notification channel identified by the id ``123-456-789``.

**Status Codes:**

 - **200** - OK
 - **404** - Notification channel doesn't exist.

.. raw:: html

    <script src="../_static/api_cluster.js"></script>