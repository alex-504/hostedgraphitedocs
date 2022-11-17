==============
Metrics API
==============

.. contents::

Searching Metrics
-----------------

``GET /api/v1/metric/search?``

**Curl examples:**
::

	curl -X GET "https://YOUR-API-KEY-HERE@api.hostedgraphite.com/api/v1/metric/search?pattern=foo.bar.*"

Search for metrics that match the pattern ``foo.bar.*``

::

	curl -X GET "https://YOUR-API-KEY-HERE@api.hostedgraphite.com/api/v1/metric/search?pattern=foo.bar.*&only_updated_after=5h"

Search for metrics that match the pattern ``foo.bar.*`` that only received datapoints in the last 5 hours.

**Available Parameters:**

- | **pattern** [REQUIRED]
  | Format: ``foo.bar.*``
  | Metric pattern to search for.
- | **only_updated_after**
  | Format: only_updated_after=1h | ony_updated_after=5h
  | To limit search results for metrics that only received datapoints in the last n hours.
- | **only_updated_before**
  | Format: only_updated_before=1mon | only_updated_before=5mon
  | To limit search results for metrics that have not received datapoints in the last n months.
- | **with_times**
  | Format: with_times=true
  | To return the first ("created_at") and last ("last_updated") seen timestamp for that metric.
- | **page**
  | Format: page=4 | page=2
  | Return the nth page of results, for searches that return more than the maximum page size (default maximum size: 100). 


**Response format**:

.. code-block:: javascript

 HTTP/1.1 200
 Content-Type: application/json

 {
 	"results": ["foo.bar.1", "foo.bar.2"],
 	"metrics_matched": 2,
 	"total_metrics": 12345,
 	"next_page": 2,
 }


**Response format with '&with_times=true'**:

.. code-block:: javascript

  HTTP/1.1 200
  Content-Type: application/json

  {
    "results": ["foo.bar.1", "foo.bar.2"],
    "metrics_matched": 2,
    "total_metrics": 12345,
    "times": {
      "foo.bar.1": {
        "created_at": 1234567890,
        "last_updated": 1234567890
      },
      "foo.bar.2": {
        "created_at": 1234567890,
        "last_updated": 1234567890
      }
    }
  }

**Response Parameters**:

- | **results**
  | List of metrics that match the specified pattern.
- | **metrics_matched**
  | The number of metrics matched by this pattern.
- | **total_metrics**
  | The total number of metrics on the account.
- | **next_page**
  | If the total returned metrics exceeds the page size (default 100), indicates the next page in the sequence. 
- | **times**
  | An array of dictionaries with the filtered metrics as keys containing the "created_at" and "last_updated" timestamps of the metric.

**Status Codes:**

- **200** - Success
- **400** - Invalid format.

**Legacy Parameters:**

- | **not_updated_in**
  | Format: not_updated_in=1y | not_updated_in=5y
  | To limit search results for metrics that only received datapoints in the last n hours.
  | This has the same functionality as ``only_updated_after``. 

Deleting Metrics
----------------

``POST /api/v1/metric/delete``

**Curl example:**
::

  curl -d "pattern=foo.bar.*" "https://YOUR-API-KEY-HERE@api.hostedgraphite.com/api/v1/metric/delete/"

Delete all metrics that match the pattern `foo.bar.*`.

**Status Codes:**

 - **200** - Success
 - **400** - Invalid request.

.. raw:: html

    <script src="../_static/api_cluster.js"></script>
