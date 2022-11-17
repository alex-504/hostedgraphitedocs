
Pingdom
=======
If your site goes down, is it reflected on your graphs? With a pingdom webhook add-on, you can now flag your graphs when pingdom fires an alert.


How to set up a Pingdom webhook
-------------------------------

The webhook provided by Hosted Graphite can be used in Pingdom both as an alerting endpoint, and with integrations. To get Pingdom alert information added to Hosted Graphite as annotations, follow these instructions:

- | **Copy your Pingdom webhook location by clicking the 'Copy Webhook Location' button**

.. figure:: /docimg/pingdom/pingdom_copy_webhook.png
   :scale: 40%
   :alt: Copy Hosted Graphite pingdom webhook
   :align: center

Adding an Alerting Endpoint
^^^^^^^^^^^^^^^^^^^^^^^^^^^

- | **Browse to your Pingdom account, visit 'alerting' section, and click 'Alerting Endpoints'**

.. figure:: /docimg/pingdom/pingdom_add_endpoint_menu.png
   :scale: 40%
   :alt: Pingdom Alerting Endpoints
   :align: center


- | **On the top right-hand side, click "Add Alerting Endpoint"**


.. figure:: /docimg/pingdom/alerting_endpoints_button.png
   :scale: 40%
   :alt: Pingdom alerting endpoints button
   :align: center


- | **Click 'Add Contact Method', select 'URL / Webhook' and paste your Hosted Graphite Pingdom webhook location, click 'Add'**


.. figure:: /docimg/pingdom/pingdom_add_webhook.png
   :scale: 80%
   :alt: Pingdom paste Hosted Graphite endpoint
   :align: center


- | **Save the endpoint**

.. figure:: /docimg/pingdom/pingdom_add_alerting_endpoint.png
   :scale: 80%
   :alt: Pingdom save Alert Endpoint with Hosted Graphite webhook
   :align: center


   You've now saved a Hosted Graphite webhook for your alerting endpoint. Assign this alerting endpoint as one of your contact methods for an outage, and then add the pingdom annotations to your alerts.


Adding an Integration
^^^^^^^^^^^^^^^^^^^^^

- | **Browse to your Pingdom account, visit 'Integrations' section, and click 'Integrations'**

.. figure:: /docimg/pingdom/pingdom_add_integration_menu.png
   :scale: 70%
   :alt: Pingdom Integrations
   :align: center


- | **On the top right-hand side, click "Add integration"**

.. figure:: /docimg/pingdom/pingdom_integration_button.png
   :scale: 40%
   :alt: Pingdom integration button
   :align: center


- | **Select Type: 'URL / Webhook', give your integration a name (e.g. 'Hosted Graphite') and paste your Hosted Graphite Pingdom webhook location. Make sure the Active box is ticked, and click 'Save integration'**

.. figure:: /docimg/pingdom/pingdom_integration_add_webhook.png
   :scale: 70%
   :alt: Pingdom paste Hosted Graphite endpoint
   :align: center

- | **Select one of your checks or create a new one, and scroll to the bottom of the Edit window. Your new integration should appear in the 'Connect integrations' list. Select the integration, and click 'Create Check'/'Modify Check'**

.. figure:: /docimg/pingdom/pingdom_enable_integration.png
   :scale: 80%
   :alt: Enable Integration within Check
   :align: center

Your PIngdom check will now send detailed event information to Hosted Graphite, including all your specified check tags and the following check-type specific information, as searchable annotation tags:

- HTTP: full URL (including http(s) prefix)
- DNS: expected IP, name server
- UDP: sent string, expect response

To Enable Pingdom Annotations in Your Dashboards
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- | **Browse to your Hosted Graphite graph, and enable Annotations**

.. figure:: /docimg/pingdom/Enable_annotations.png
   :scale: 70%
   :alt: Enable Annotations
   :align: center


- | **Enable Pingdom Annotations**

.. figure:: /docimg/pingdom/Add_pingdom_annotation.png
   :scale: 40%
   :alt: Enable Pingdom Annotations
   :align: center

   Use the tag "Pingdom" to see all pingdom alerts, or the hostname of the pingdom check to see tagged annotations for that host. If you are using Pingdom Integrations, you can also search by your check tags or any of the specific fields listed above.


- | **Finally, you will see site outages on your graphs**

.. figure:: /docimg/pingdom/Pingdom_annotations_displayed.png
   :scale: 40%
   :alt: Enable Pingdom Annotations
   :align: center


   More information on annotations can be found by following our :doc:`annotations </api/annotations-and-events>` documentation.
