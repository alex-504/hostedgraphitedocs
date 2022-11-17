
Sentry
=======
When your app encounters an error, does it affect your graphs? With a Sentry webhook add-on, you can pinpoint your Sentry events in time to see if they coincide with changes in your metrics. 


How to set up a Sentry webhook
-------------------------------

The webhook provided by Hosted Graphite can be used in Sentry as an alerting endpoint. To add Sentry alert information to Hosted Graphite as annotations, follow these instructions: 

- | **Navigate to the Add-ons section of your Hosted Graphite account and copy your Sentry webhook location by clicking the 'Copy' button and follow the mouseover directions**

.. figure:: /docimg/sentry/sentry-copy-webhook.png
   :scale: 60%
   :alt: Copy Hosted Graphite Sentry webhook
   :align: center

Adding an Alerting Endpoint (in your Sentry account)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- | **Browse to your Sentry account, visit 'Project Settings' section, and click 'All Integrations'**

.. figure:: /docimg/sentry/Project-Settings-first-with-arrow.png
   :scale: 50%
   :alt: Sentry Project Settings
   :align: center

- | **Scroll down to 'WebHooks' and make sure the tickbox is checked. Save changes if necessary.**

.. figure:: /docimg/sentry/Project-Settings-second-with-arrow.png
   :scale: 80%
   :alt: Activate Sentry WebHook Integration
   :align: center


- | **Browse to the Alerts settings**

.. figure:: /docimg/sentry/Project-Settings-third-with-arrow.png
   :scale: 80%
   :alt: Sentry Alerts
   :align: center

- | **Scroll down, and add the Hosted Graphite Sentry webhook location to the field. Don't forget to save your changes.**

.. figure:: /docimg/sentry/Project-Settings-fourth-with-arrow.png
   :scale: 80%
   :alt: Sentry WebHook Callback URL
   :align: center

- | **Scroll back up and either add or edit an alert Rule that corresponds to the Events you want to send to Hosted Graphite. Only alerts you send will appear on your graphs, so choose triggers and intervals that make sense for your use case.**

.. figure:: /docimg/sentry/Project-Settings-sixth-with-circle.png
   :scale: 80%
   :alt: Pingdom paste Hosted Graphite endpoint
   :align: center

- | **Ensure the notification is being sent through WebHooks. (You can send it to other services too, if you'd like.)**

.. figure:: /docimg/sentry/Rule-edit-second-with-arrow.png
   :scale: 80%
   :alt: Pingdom paste Hosted Graphite endpoint
   :align: center

   You've now saved a Hosted Graphite webhook for your alerting endpoint and assigned it to an alert. Now, once you've triggered some alerts, you can plot them on your graphs. 

To View Sentry Annotations in Your Dashboards
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- | **Browse to your Hosted Graphite graph and open the Annotations dialog**

.. figure:: /docimg/sentry/Grafana-annotation-first-with-arrow.png
   :scale: 80%
   :alt: Enable Annotations
   :align: center


- | **Create and name a new annotation, and query on any tag to see your Sentry alerts**

.. figure:: /docimg/sentry/Grafana-annotation-third-with-arrow.png
   :scale: 80%
   :alt: Add annotation name you like and 'sentry' as your event query
   :align: center


   Sentry tags are sent as ``(key, value)`` pairs, but Hosted Graphite annotations are a series of strings. If your events are tagged with ``(room: "356B")``, you'll be able to query it using ``room=356B``. By default we store the project slug, server name, error level, and the word "sentry" so you can quickly filter annotations for your dashboards. 

- | **Finally, you will see Sentry events on your graph**

.. figure:: /docimg/sentry/Grafana-annotation-done-yay.png
   :scale: 50%
   :alt: Sentry events appear as a red vertical line on your graph
   :align: center


   More information on annotations can be found by following our :doc:`annotations </api/annotations-and-events>` documentation.
