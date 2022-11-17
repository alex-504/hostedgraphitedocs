
===========================================
Aggregation Rules API
===========================================

.. contents::

.. index:: Aggregation Rules API

Aggregation rules consolidate the averaged values of many metrics into one, allowing for speedy graph rendering and visualization. Managing aggregation rules can be done easily with Hosted Graphite. Learn more about what our aggregation rules do, and how to use our Aggregation Feature :doc:`here </additional/aggregation-rules>`.

Creating Aggregation Rules
--------------------------

``POST /v1/aggregates/``

**Request format**:

.. code-block:: bash

  {
    "pattern": "string",
    "output": "string"
  }


**Parameters**:

- | **pattern**
  | **[REQUIRED]**
  | Regex or node pattern to match ingested metrics to.
- | **output**
  | **[REQUIRED]**
  | Metric output, when a metric is matched with the pattern, those metrics will be mapped to this output and appear in your account.

**Responses**:

- | **200**:
  | Aggregation rule was created successfully. Returns created aggregation's ID.
- | **400**:
  | Creation failed.
  | Pattern or output is an invalid input (or not provided).
  | Or the aggregation rule creation failed because the pattern is too computationally expensive to match against your metric names. If this keeps happening, please `contact support <mailto:support@hostedgraphite.com>`_ . 
- | **403**:
  | Creation failed, you have reached the limit for your account, `contact support <mailto:support@hostedgraphite.com>`_.
- | **409**:
  | Creation failed, aggregation with this pattern & output already exists.
- | **500**:
  | Creation failed due to a server error - this shouldn't happen. If this keeps happening, please let us know by `contacting support <mailto:support@hostedgraphite.com>`_.

**Curl Example**:

.. code-block:: bash

  curl -H "Content-Type: application/json" -X POST -d \
  '{"pattern": "servers.*.requests.<response_code>", "output": "servers.all.requests.<response_code>"}' \
  "https://YOUR-API-KEY@api.hostedgraphite.com/v1/aggregates/"

Creates an aggregation with the pattern: ``servers.*.requests.<response_code>`` and the output ``servers.all.requests.<response_code>``.
Metrics which look like ``servers.server-0001.requests.200`` and ``servers.server-0002.requests.200`` would appear in your account as ``aggregates.servers.all.requests.200``.
Metrics which look like ``servers.server-0001.requests.404`` and ``servers.server-0002.requests.404`` would appear in your account as ``aggregates.servers.all.requests.404``.


Listing Aggregations
----------------------
``GET /v1/aggregates/``

**Responses**:

- | **200**:
  | List of your aggregation rules.

``GET /v1/aggregates/<aggregation_id>/``

**Responses**:

- | **200**:
  | Aggregation with passed ID if it exists, empty list otherwise.


**Curl Example**:

.. code-block:: bash

  curl "https://YOUR-API-KEY@api.hostedgraphite.com/v1/aggregates/<optional_id>/"

Lists your aggregations or individual aggregation if optional ID is passed.



Deleting Aggregates
--------------------

``DELETE /v1/aggregates/<aggregate_id>/``

**Responses**:

- | **200**:
  | Aggregation was succesfully deleted.
- | **400**:
  | No aggregation ID passed.
- | **412**:
  | Aggregation with passed ID does not exist.
- | **500**:
  | Delete failed, please try again.


**Curl Example**:

.. code-block:: bash

  curl -X DELETE "https://YOUR-API-KEY@api.hostedgraphite.com/v1/aggregates/<aggregate_id>/"

Delete aggregation rule with passed id.


Editing Your Aggregations
-------------------------

To edit an aggregation rule, you can do this through the Hosted Graphite UI. Additionally, aggregation rules have no state, so it is safe to delete and re-create them. Learn more about our :doc:`Aggregate Rules Feature </additional/aggregation-rules>`.

.. raw:: html

    <script src="../_static/api_cluster.js"></script>