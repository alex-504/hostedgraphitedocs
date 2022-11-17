Dashboard HTTP API
==================

.. index:: Dashboard API


Hosted Graphite supports an HTTP API which allows you to fetch, create, and update your primary dashboards.

.. contents::


Create dashboard
----------------

``POST /api/v2/grafana/dashboards/`` - Creates a new dashboard

**Curl example:**
::
    
	curl -X POST https://YOUR-API-KEY@api.hostedgraphite.com/api/v2/grafana/dashboards/ \
	     -d @dashboard.json 

**Example dashboard:**

.. code-block:: javascript
    
	{
        "title": "Production Overview",
       	"tags": [ "templated" ],
       	"timezone": "browser",
       	"panels": [
            {
            }
     	],
      	"schemaVersion": 6,
      	"version": 0
   	}

This example creates a dashboard with the name "Production Overview" in accordance with the ``title`` field above.

**Example response:**

.. code-block:: javascript

    HTTP/1.1 200
    Content-Type: application/json

    {
      "slug": "production-overview",
      "status": "success",
      "version": 1
    }

**Status Codes:**

- **200** - Created
- **400** - Invalid JSON
- **409** - Dashboard already exists


Update dashboard
----------------

``PUT /api/v2/grafana/dashboards/`` - Updates existing dashboard

**Curl example:**
::
    
	curl -X PUT https://YOUR-API-KEY@api.hostedgraphite.com/api/v2/grafana/dashboards/ \
             -d @dashboard.json 

**Example dashboard:**

.. code-block:: javascript
    
	{	
        "id": 1
       	"title": "Production Overview",
       	"tags": [ "templated", "prod" ],
        "timezone": "browser",
       	"panels": [
            {
            }
       	],
       	"schemaVersion": 6,
	"message": "version control message" // this is optional
  	}


**Example response:**

.. code-block:: javascript

    HTTP/1.1 200
    Content-Type: application/json

    {
       "slug": "production-overview",
       "status": "success",
       "version": 2
    }

**Status Codes:**

- **200** - Updated
- **400** - Invalid JSON


Get dashboard
-------------

``GET /api/v2/grafana/dashboards/:slug`` - Returns a dashboard given the dashboard slug, a url friendly version of the dashboard title.

**Curl example:**
::

	curl -X GET https://YOUR-API-KEY@api.hostedgraphite.com/api/v2/grafana/dashboards/production-overview

**Example response:**

.. code-block:: javascript

    HTTP/1.1 200
    Content-Type: application/json

    {
        "meta": {
            "isStarred": false,
            "slug": "production-overview"
        },
        "model": {
            "id": null,
            "title": "Production Overview",
            "tags": [ "templated" ],
            "timezone": "browser",
            "panels": [
                {
                }
            ]
            "schemaVersion": 6,
            "version": 0
        },
    } 

**Status Codes:**

- **200** - Found
- **400** - No dashboard specified
- **404** - Dashboard not found


Delete dashboard
----------------

``DELETE /api/v2/grafana/dashboards/:slug`` - Deletes a dashboard given the dashboard slug.

**Curl example:**
::
    
	curl -X DELETE https://YOUR-API-KEY@api.hostedgraphite.com/api/v2/grafana/dashboards/production-overview

**Example response:**

.. code-block:: javascript
	
    HTTP/1.1 200
    Content-Type: application/json

    {"title": "Production Overview"}

**Status Codes:**

- **200** - Deleted
- **400** - No dashboard specified
- **404** - Dashboard not found


Get dashboard tags
------------------

``GET /api/v2/grafana/tags`` - Get all tags of dashboards.

**Curl example:**
::
    
	curl -X GET https://YOUR-API-KEY@api.hostedgraphite.com/api/v2/grafana/tags

**Example response:**

.. code-block:: javascript
    
    HTTP/1.1 200
    Content-Type: application/json

    [
        {
            "term":"templated",
            "count":1
        },
        {
            "term":"production",
            "count":4
        }
    ]	

**Status Codes:**

- **200** - OK


Search dashboards
-----------------

``GET /api/v2/grafana/search`` - Returns a list of dashboards given a search query.

**Curl example:**
::
    
    curl -i -X GET https://YOUR-API-KEY@api.hostedgraphite.com/api/v2/grafana/search?query=prod

**Example response:**

.. code-block:: javascript
    
    HTTP/1.1 200
    Content-Type: application/json

    [
        {
            "id":1,
            "title":"Production Overview",
            "uri":"db/production-overview",
            "type":"dash-db",
            "tags":[ templated, production ],
            "isStarred":true
        },
        {
            "id":4,
            "title":"Production Webservers",
            "uri":"db/production-webservers",
            "type":"dash-db",
            "tags":[ production ],
            "isStarred":true        
        }
    ]

Curl Example to Return all Dashboards:
::
    
    curl -i -X GET https://YOUR-API-KEY@api.hostedgraphite.com/api/v2/grafana/search\?query\=%

**Status Codes:**

- **200** - OK
- **400** - Invalid form data



Dashboard Rendered PNGs
-----------------------

``GET /api/v2/grafana/render/?target=foo.bar`` - Returns a link to a publicly accessible .PNG image of a dashboard panel

**Curl Example:**
::

    curl -i -X GET "https://<api-key>@api.hostedgraphite.com/api/v2/grafana/render/?target=foo.bar"

**Example response:**

.. code-block:: javascript

    HTTP/1.1 200
    Content-Type: application/json

    http://i.mfhg.io/render-api/<user-id>/<filename>.png

**Status Codes:**

- **200** - OK
- **400** - Invalid form data


To display any data on the graph you must include a 'target', you can append multiple targets to the request as follows:

``?target=foo.bar.A&target=foo.bar.B``

Available Parameters (default values in brackets):

- | **from** (-6h)
  | Format: -<num>m|h|d|w|M|Y
  | Example: &from=-6h for the last 6 hours
- | **to** (now)
  | Format: now-<num>m|h|d|w|M|Y
  | Example: &to=now-2h for data up to 2 hours ago
- | **width** (1000)
  | Format: number measured in pixels
  | Example: &width=1200
- | **height** (500)
  | Format: number measured in pixels
  | Example: &height=500
- | **theme** (dark)
  | Format: "light" | "dark"
  | Example: &theme=light
- | **fill** (1)
  | Format: number in range 0 (no fill) to 10
  | Example: &fill=3

**Time Queries:**

- m = Minutes
- h = Hours
- d = Days
- w = Weeks
- M = Months
- Y = Years

.. raw:: html

    <script src="../_static/api_cluster.js"></script>

    <script src="../_static/cta.js"></script>


