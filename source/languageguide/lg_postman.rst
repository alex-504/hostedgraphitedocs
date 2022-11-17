
Postman
===========

.. index:: Postman

Sending a metric via HTTP POST
---------------------------------

1. Open Postman.
2. Create a new request, set its type to *POST* and its *URL* to ``https://www.hostedgraphite.com/api/v1/sink``

   .. figure:: /docimg/postman/step2.png
      :alt: Postman Step 2
      :align: center

3. Go to the *Authorization* tab. For the authorization type select *Basic Auth*. In the *username* field, enter your Hosted Graphite *API key*.

   .. figure:: /docimg/postman/step3.png
      :alt: Postman Step 3
      :align: center

4. Go to the *Body* tab. Select *raw*, and enter a datapoint for your metric (you can send multiple datapoints as long as they are on separate lines). You may also include an optional Unix timestamp with your datapoint. A datapoint has the following parameters: ``<metricName> <value> <optionalTimestamp>``

   .. figure:: /docimg/postman/step4.png
      :alt: Postman Step 4
      :align: center

5. Click the *Send* button to send your datapoint. When your datapoint has been sent successfully, you will receive a response with status *202 Accepted*.

   .. figure:: /docimg/postman/step5.png
      :alt: Postman Step 5
      :align: center


.. include:: ../common/common_getapikey.rst
.. raw:: html

    <script src="../_static/uid_prefix.js"></script>
