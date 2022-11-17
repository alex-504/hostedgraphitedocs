
Collectd
========

.. index:: collectd

`collectd <https://collectd.org/>`_ is a daemon which collects system performance statistics periodically and can store values in many ways, including Hosted Graphite.

- See the `collectd first steps <https://collectd.org/wiki/index.php/First_steps>`_ for installation.
- Once installed, configure the `write_graphite <https://collectd.org/documentation/manpages/collectd.conf.5.shtml#plugin_write_graphite>`_ collectd plugin with the following settings:

::

    Host "carbon.hostedgraphite.com"
    Port "2003"
    Prefix "your-api-key.collectd."

To find your API key, see :ref:`here <api-key>`.

Review the `write_graphite <https://collectd.org/documentation/manpages/collectd.conf.5.shtml#plugin_write_graphite>`_ plugin documentation for details of the other write_graphite plugin settings.


Downloadable Configuration:
---------------------------

You can download a configuration file for collectd, pre-filled with your Hosted Graphite account details, on our `Add-Ons <https://www.hostedgraphite.com/app/addons/>`_ page. These configurations are compatible with multiple versions of collectd but we provide v5.2 and v5.4 for the purpose of keeping the config file as close to the default one as possible.

We have a number of `collectd plugins <https://collectd.org/wiki/index.php/Table_of_Plugins>`_ enabled. These include: CPU, DF (file system usage), disk, entropy, interface, load, memory, processes, rrdtool, swap, users and as previously mentioned write_graphite. 

Once downloaded, you can place this file in /etc/collectd/ (or where ever you've configured collectd to store its config file). Then restart the daemon and you wait to see your metrics arrive.

Your collectd metrics will arrive under the "collect.*" metric pattern.


Automatic Dashboards:
---------------------

There are two similar collectd dashboards available, one for collectd version 5.2 and one for version 5.4, you can enable in our Dashboard Library.

Both of these dashboards aim to provide an overview of the default plugins provided by collectd. If you have enabled collectd dashboards without all of the plugins listed above, some of the graphs defined on these automatic dashboards might not populate.

