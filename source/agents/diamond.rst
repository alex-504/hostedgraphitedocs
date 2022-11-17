Diamond
=======


To collect useful system metrics in Hosted Graphite such as System CPU, User CPU, Load Average, and Physical Memory you can use a python daemon called `Diamond <https://github.com/python-diamond/Diamond>`_.
Diamond runs on your server, and intermittently sends these useful system metrics to Graphite. Here's a quick primer on how to configure it.

.. index:: CPU Load, Disk IO, Network IO, Memory Usage, Diamond

Configuring Diamond
-------------------

- | **Download Diamond** - Available at `https://github.com/BrightcoveOS/Diamond <https://github.com/python-diamond/Diamond>`_.

- | **Install Diamond** - Follow the installation instructions at `https://github.com/BrightcoveOS/Diamond/wiki/Installation <https://github.com/BrightcoveOS/Diamond/wiki/Installation>`_.

- | **Edit the config file** - Usually located at ``/etc/diamond/diamond.conf``

   1) At the top of the config file, add the HostedGraphiteHandler

    .. code-block:: bash

        # Handlers for published metrics.
        handlers =  diamond.handler.hostedgraphite.HostedGraphiteHandler


   2) Under the ``[handlers]`` ``[[HostedGraphiteHandler]]`` section, set:

    .. code-block:: bash

        apikey = YOUR_API_KEY
        timeout = 15
        batch = 1

   3) Under the ``[[default]]`` section, you can change how frequently metrics are reported:

    .. code-block:: bash

        interval = 30

   4) On our servers we also enable collectors for network metrics and MySQL:

    .. code-block:: bash

        [[NetworkCollector]]
        enabled = True

        [[MySQLCollector]]
        enabled = True
        hosts = username:pass@localhost:3306/mysql,
        master = True
        innodb = True

- | **More collectors** - Here is a `full list of Diamond collectors <https://github.com/BrightcoveOS/Diamond/wiki/Collectors>`_ for various systems e.g. Hadoop, NetApp, Nginx, Postgres, RabbitMQ, Redis and Zookeeper


- | **Start Diamond** - Usually with ``/etc/init.d/diamond start`` but it may differ depending on your OS.

Diamond should now be configured to send data to Hosted Graphite and it will appear under the 'servers' entry in your tree of metrics.

