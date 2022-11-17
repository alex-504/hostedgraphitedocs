Collectd
========


`collectd <https://collectd.org/>`_ is a simple monitoring client which can be installed on most Linux systems. To simplify the setup, we provide a configuration file for you to use.

         **Installing and configuring collectd**

            1. Install collectd on your system. It's usually available via your normal package manager, e.g. ``apt-get install collectd``

            2. From the Hosted Graphite Add-ons page, select collectd and download the appropriate configuration file. Version 5.4 works with most versions of collectd

            3. Copy the downloaded configuration file to ``/etc/collect/collectd.conf``. If you want to keep the original configuration file, rename it to collectd.conf.old

            4. Restart collectd so that it uses the new configuration file: ``sudo service collectd restart``

         **Generating and viewing the collectd dashboard**

            Once collectd is up and running, you can automatically generate a dashboard from our dashboard library. Go to the Add-ons page and scroll down to the Dashboards section. 

            .. figure:: /docimg/gettingstarted/dashboard-library.png
               :scale: 90%
               :alt: The Dashboard Library panel
               :align: center

               The Dashboard Library panel

On that panel select the collectd version you want to make a dashboard for and click the button, a dashboard will immediately be available for your collectd metrics. For details on how to manually configure collectd, see our :doc:`collectd doc </integrationguide/ig_collectd>` in our Add-Ons and Integrations Guide.

.. raw:: html

    <script src="_static/uid_prefix.js"></script>