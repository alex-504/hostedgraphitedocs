
GitHub
======
Hosted Graphite provides a post-receive github hook, which allows you to flag when commits are added to your repos with dashboard annotations.




How to Send GitHub Commit Data to Hosted Graphite
--------------------------------------------------

To get GitHub commits flagged in Hosted Graphite follow these instructions:

- | **Go to the Addons page, and in the Annotation Add-Ons section click on the Github card.**
- | **Copy the webhook URL, including your API key.**

.. figure:: /docimg/integrations/github/github_webhook1.png
   :scale: 80%
   :alt: Copy the webhook URL from the Github add-on page
   :align: center

   Copy the webhook URL from the Github add-on page

- | **Browse to your github repo, visit the 'settings' section, then 'webhooks'**
- | **Under 'Webhooks' click the "Add Webhook" button.**
- | **Enter the URL in the box provided**
- | **Select 'application/json' as the content type, and 'send me everything'**


.. figure:: /docimg/integrations/github/github_webhook2.png
   :scale: 80%
   :alt: Enter your webhook URL into the Github New Webhooks page
   :align: center

   Enter your webhook URL into the Github New Webhooks page


- | **Hit 'Save'.** 

Your github events will now be sent to the webhook URL and saved on your account as `Annotations <https://www.hostedgraphite.com/docs/api/annotations-and-events.html>`_. Use the following tags to search for the annotations you want to display:

- | **Push Event Tags** -- 'github', 'push', <repo>, <branch>, <user> 
- | **PR Event Tags** -- 'github', 'pull-request', <action>, <repo>, <user> 
- | **Deploy Event Tags** -- 'github', 'deployment', <status>, <repo>, <user>, <environment> 

.. figure:: /docimg/integrations/github/github_annotations.png
   :scale: 80%
   :alt: Set up your Github annotations in your primary dashboards
   :align: center

   Set up your GitHub annotations

