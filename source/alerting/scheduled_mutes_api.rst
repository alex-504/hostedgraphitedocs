.. _hg_scheduled_mutes_api:

===========================================
Scheduled Mutes API
===========================================

.. index:: Scheduled Mutes API

.. contents:: Table of Contents
   :depth: 2

Creating scheduled mutes
------------------------

``POST /v2/schedules/``

**Request format**:

.. code-block:: javascript

  {
     "name": "string",
     "start_time": "14:20",
     "duration": 123,
     "timezone": "UTC-2",
     "repeat": ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]
  }

**Parameters**:

- | **name**
  | **[REQUIRED]**
  | A name that uniquely identifies this scheduled mute.
- | **start_time**
  | **[REQUIRED]**
  | A 24-hour time string at which the scheduled mute will begin.
- | **duration**
  | **[REQUIRED]**
  | Mute time in minutes.
- | **timezone**
  | The timezone string for this scheduled mute's start time. Valid values are "UTC-12"..."UTC-1", "UTC", "UTC+1"..."UTC+14". Defaults to "UTC" if not specified.
- | **repeat**
  | The list of days at which the scheduled mute will repeat on. Becomes a one-time scheduled mute if not specified. Valid values are "mon", "tue", "wed", "thu", "fri", "sat" and "sun".


**Curl example**
::

    curl -H "Content-Type: application/json" -X POST -d \
    '{"name": "Mute on weekends", "start_time": "00:00", "duration": 1440, "timezone": "UTC+2", "repeat": ["sat", "sun"]}' \
    "https://YOUR-API-KEY@api.hostedgraphite.com/v2/schedules/"

Creates a scheduled mute named "Mute on weekends" that starts at 12AM in timezone UTC+2, with a mute duration of 24 hours, and repeats every Saturday and Sunday.

**Response format**:

.. code-block:: javascript

    HTTP/1.1 201
    Content-Type: application/json

    {
       "id": "<scheduled_mute_id>",
       "url": "/v2/schedules/<scheduled_mute_id>"
    }

**Parameters**:

- | **id**
  | An id that uniquely identifies this scheduled mute.
- | **url**
  | URL endpoint that can be used to perform actions on this scheduled mute.

**Status Codes:**

- **201** - Created
- **400** - Invalid form data.
- **409** - Scheduled mute with the name already exists.

Searching scheduled mutes
-------------------------

``GET /v2/schedules/?`` - Returns a JSON object containing information on scheduled mutes matching the search query. Returns all scheduled mutes if the parameter is left empty.

**Curl example:**
::

   curl -X GET "https://YOUR-API-KEY@api.hostedgraphite.com/v2/schedules/?"

**Parameters**:

Available Parameters (default values in brackets):

- | **name**
  | Format: &name=<scheduled_mute_name1>&name=<scheduled_mute_name2>
  | The scheduled mute name to search for. Can specify multiple scheduled mute names to search for more than 1. Performs an OR operation so a query such as ``&name=<scheduled_mute_name1>&name=<scheduled_mute_name2>`` will return info on both scheduled_mute_name1 and scheduled_mute_name2.
- | **id**
  | Format: &id=<scheduled_mute_id1>&id=<scheduled_mute_id2>
  | The scheduled mute ID to search for. Can specify multiple scheduled mute IDs to search for more than 1. Performs an OR operation so a query such as ``&name=<scheduled_mute_id1>&name=<scheduled_mute_id2>`` will return info on both scheduled_mute_id1 and scheduled_mute_id2.
- | **duration**
  | Format: &duration=<duration1>&id=<duration2>
  | Searches for scheduled mutes by their duration. Can specify multiple durations to search for. Performs an OR operation so a query such as ``&duration=30&duration=10`` will return scheduled mutes with a 10 minute duration or a 30 minute duration.
- | **start_time**
  | Format: &start_time=<start_time1>&start_time=<start_time2>
  | Searches for scheduled mutes by their start time. Can specify multiple start times to search for. Performs an OR operation so a query such as ``&start_time=12:00&start_time=20:00`` will return scheduled mutes that start at either 12PM or 8PM.
- | **timezone**
  | Format: &timezone=<timezone1>&timezone=<timezone2>
  | Searches for scheduled mutes by their timezone. Can specify multiple timezones to search for. Performs an OR operation so a query such as ``&timezone=UTC+2&timezone=UTC-14`` will return scheduled mutes that have either UTC+2 or UTC-14 timezones.
- | **repeat**
  | Format: &repeat=<day1>&repeat=<day2>
  | Searches for scheduled mutes by their repeat days. Can specify multiple repeat days to search for. Performs an OR operation so a query such as ``&repeat=sun&repeat=thu`` will return scheduled mutes that repeat on either Sunday or Thursday.
- | **page** (1)
  | Format: &page=1
  | The page number to query. Used if there are more items than can be displayed in a single request.
- | max(100)
  | Format: &max=50
  | The maximum number of items to display. Limit of 100.

Specifying multiple fields performs an ``OR`` operation and returns scheduled mutes that match either criteria.

**Response format**:

.. code-block:: javascript

    HTTP/1.1 200
    Content-Type: application/json

    {
      "scheduled_mutes": [
          {
            "name": "name of scheduled mute",
            "id": "scheduled mute ID",
            "duration": 123,
            "alerts" : ["alert_id1", "alert_id2", "alert_id3"],
            "start_time": "20:20",
            "timezone": "UTC+4",
            "repeat": ["mon", "wed", "fri"]
          },
          ...
        ],
      "next_page": False | <page_number>
    }

**Parameters**:

- | **scheduled_mutes**
  | List of scheduled mutes returned by the search query.
- | **next_page**
  | The number of the next page. Set to False if there's no more pages.

**Status Codes:**

- **200** - OK.
- **400** - Invalid search query parameters.


Obtain information on a single scheduled mute
---------------------------------------------

``GET /v2/schedules/<scheduled_mute_id>/`` - Returns information on a single scheduled mute identified by ``<scheduled_mute_id>``.

**Curl example:**
::

   curl -X GET "https://YOUR-API-KEY@api.hostedgraphite.com/v2/schedules/123-456-789/"
   
Obtain information on the scheduled mute identified by the ID 123-456-789.

**Response format**:

.. code-block:: javascript

    HTTP/1.1 200
    Content-Type: application/json

    {
      "name": "name of scheduled mute",
      "id": "scheduled mute ID",
      "duration": 123,
      "alerts" : ["alert_id1", "alert_id2", "alert_id3"],
      "start_time": "20:20",
      "timezone": "UTC+4",
      "repeat": ["mon", "wed", "fri"]
    }

**Status Codes:**

- **200** - OK.
- **404** - Scheduled mute doesn't exist.

Updating scheduled mutes
------------------------

``PUT /v2/schedules/<scheduled_mute_id>/`` - Updates the attributes of a scheduled mute identified by ``<scheduled_mute_id>``.

**Curl example:**
::

    curl -H "Content-Type: application/json" -X PUT \
    -d '{"start_time": "14:50", "timezone": "UTC+12"}' \
    "https://YOUR-API-KEY@api.hostedgraphite.com/v2/schedules/123-456-789/"

Updates the start time and timezone of the scheduled mute with id ``123-456-789``.

**Request format**:

.. code-block:: javascript

  {
     "name": "string",
     "start_time": "14:20",
     "duration": 123,
     "timezone": "UTC-2",
     "repeat": ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]
  }
  
Each field is optional and only the specified fields are updated.

**Status Codes:**

- **200** - OK.
- **400** - Invalid form data.
- **404** - Scheduled mute doesn't exist.
- **409** - Scheduled mute with the updated name already exists.

Deleting scheduled mutes
------------------------

``DELETE /v2/schedules/<scheduled_mute_id>/`` - Deletes a scheduled mute identified by ``<scheduled_mute_id>``.

**Curl example:**
::

   curl -X DELETE "https://YOUR-API-KEY@api.hostedgraphite.com/v2/schedules/123-456-789/"
   
Delete the scheduled mute identified by the ID 123-456-789.

**Status Codes:**

- **200** - OK.
- **404** - Scheduled mute doesn't exist.

.. raw:: html

    <script src="../_static/api_cluster.js"></script>