
Access Keys
===========

.. index:: Access Keys

.. contents::

Access Keys allow you to share read-only access to your graphite data with external applications, scripts or dashboard plugins. For added security, a key can be limited to a whitelist of IP addresses. Team users with read-only or read/write privileges will not see the Access Key list or have the option to create keys, only team managers and account owners have access.


What can I use an Access Key for?
---------------------------------

An `Access Key <https://www.hostedgraphite.com/app/sharing/>`_ can help you use different Graphite plugins using Hosted Graphite Data, such as:

- | **Tasseo**
  | A real-time Graphite dashboard. Also available within Hosted Graphite - follow the Tasseo link at the top, or grab it from the `Tasseo github page <https://github.com/obfuscurity/tasseo>`_

- | **Graphene**
  | An alternative realtime Graphite Dashboard, see the `Graphene github page <https://github.com/jondot/graphene>`_

- | **Seyren**
  | An alerting dashboard for Graphite. See the `Seyren github page <https://github.com/scobal/seyren>`_

- | **The Graphite Render API**
  | The :doc:`Graphite Render API </api/render_api>` allows you to create images of your graph data. It's a really comprehensive way to render the data collected by Hosted Graphite.

- | **Local Dashboard Instance**
  | Add Hosted Graphite as a `data source <http://docs.grafana.org/features/datasources/graphite/>`_ to your local/self-hosted dashboard installation to render your metrics. You can find a detailed guide :doc:`here </dashboards/local-dashboards>`.

 
.. index:: Access Key List

Access Key List
---------------

.. figure:: /docimg/access_keys.png
   :scale: 50%
   :alt: Access List Keys
   :align: center

   Your list of access keys, found on the "Overview" page.

.. index:: Using Access Keys

Using an Access Key
-------------------

The created access key will be listed in the table as shown in the image above. Simple copy the location and use it in your external application as per it's documentation.


.. index:: Create access key, add access key, primary-dashboard access key, graphite access key

.. _create-ak-reference:

Create an Access Key
--------------------

Click the "Add Access Key" button to do the obvious.

.. figure:: /docimg/add_access_key.png
   :scale: 30%
   :alt: Adding an Access Key
   :align: center

   Creating an Access Key


- | **Access Key Name**
  | Creating an Access Key requires that you name the key. This has no connection to the key itself, it's just a handy reminder of why you added it. E.g. to connect to a Tasseo or Graphiti dashboard, or to an alerting system such as Seyren.

- | **Optional - Add An IP Whitelist**
  | It's not necessary for you to add a whitelist, but this will add an extra level of protection if your key is leaked, and you want to ensure that data is only coming from servers you control. The whitelist accepts comma-separated IP addresses in the standard format (XXX.XXX.XXX.XXX).

- | **Type - Primary or Graphite**
  | Unless you're specifically using the Access Key to share a primary dashboard, the option you want to pick is 'Graphite'. This gives external applications access to Graphite's data.

.. index:: Editing an Access Key

Editing an Access Key
---------------------

Clicking the wrench / Edit icon to bring up the Edit Access Key dialog. There is also an option here to Whitelist an IP if needed:

.. figure:: /docimg/edit-access-key.png
   :scale: 70%
   :alt: Edit Access Key
   :align: center

   Edit the details of your access key, hit "Save" to preserve your changes.


.. index:: Delete access key

Deleting an Access Key
----------------------

Hit the ``trash can icon`` to bring up the Delete Access Key dialog and simply hit the "Yes, Delete" button to purge the Access Key from the system.


.. index:: Access Key troubleshooting

Troubleshooting
---------------

- | **When I visit the Access Key URL I get a '403 Forbidden' error**
  | The access key enables access to the read-only parts of Hosted Graphite that allow you to retrieve data, and anything else returns a 403. If you add '/render/' to end of the created URL, you'll see a blank graph image showing a red "No Data".
- | **I still get a 403 error at the '/render/' URL**
  | Remove any whitelisted IP addresses you have added to the access key, and try again. If you still have trouble accessing the URL, `contact us <mailto:support@hostedgraphite.com>`_.
