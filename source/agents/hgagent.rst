The Hosted Graphite Agent
=========================
Our agent is a simple way to get your metrics into Hosted Graphite. You install
it on your machines, and it collects and forwards the system's metrics for you.

If you have any questions about the agent, `get in touch
<mailto:support@hostedgraphite.com>`_.

.. contents::

Installation
------------
Get started is by pulling down our installer script.

For Debian-based systems, including Ubuntu::

  curl -s https://YOUR-API-KEY@www.hostedgraphite.com/agent/installer/deb/ | sudo sh

or for RHEL-based systems::

  curl -s https://YOUR-API-KEY@www.hostedgraphite.com/agent/installer/rpm/ | sudo sh

**Testing the agent**

This can be easily tested with `Docker <https://www.docker.com/>`_, among other virtual environments. Using Docker, pull down the installer script inside an Ubuntu container:

.. code-block:: bash

  docker pull ubuntu:16.04
  docker run -it ubuntu:16.04
  
.. code-block:: bash
  
  apt-get update
  apt-get install -y curl sudo
  curl -s https://YOUR-API-KEY@www.hostedgraphite.com/agent/installer/deb/ | sudo sh

.. code-block:: bash
  
  /opt/hg-agent/bin/config --api-key YOUR-API-KEY
  /opt/hg-agent/bin/supervisord --nodaemon --configuration /etc/opt/hg-agent/supervisor.conf


If you would like to set up installation and configuration via Puppet, Chef or
a similar configuration management system, see our `repository install
instructions <https://packagecloud.io/hostedgraphite/hg-agent/install>`_.

Once your agent is sending metrics, you will find it in your `Agent list
<https://www.hostedgraphite.com/app/agent/>`_, along with a link to an
auto-generated :doc:`base` dashboard named **Hosted Graphite Agent
(Base)**.

Platforms
+++++++++
We support the following stable OS releases on 64-bit machines:

- CentOS 6 and later (covering the RedHat family);
- Debian Wheezy and later;
- Ubuntu 12.04 LTS and later.

These should cover most installs on RHEL, CentOS, Amazon Linux, and
Debian/Ubuntu family platforms.

How it Works
------------
The Hosted Graphite agent is an easy-to-use bundle of the popular metrics
collector `Diamond <https://github.com/python-diamond/Diamond>`_ and the
`Supervisor <http://supervisord.org/>`_ process manager along with an embedded
build of Python and some support scripts.

Features
++++++++
- Faster submission of metric data from your application because it doesn't
  have to do a DNS lookup, or connect out across the internet.

- More reliable delivery because the agent stores-and-forwards, buffering on
  disk when it can't connect.

- Easier debugging for the "my metric is missing" problem, because our UI can
  tell you that an agent has stopped responding.

- More secure: the agent uses HTTPS and while we offer TLS-wrapped carbon
  protocols, it's more effort to use than the plaintext ones. Sending straight to
  the agent bypasses this and we take care of it for you.

- No need to prefix your metrics with an API key for HG's authentication: it's
  handled for you, using API key in the agent config.

- No need to specify new firewall rules for carbon protocols and keep the rules
  updated - if you can already get HTTPS out of your network, even via a proxy,
  then it'll work.

For more details of how the agent works on your machines, see :doc:`layout`.
The agent's default metrics are listed and explained at :doc:`base`.

Dashboards
----------
Agent list
++++++++++
The `Agent list <https://www.hostedgraphite.com/app/agent/>`_ provides an
overview of all agents associated with your account. From here, you can view
the status of each agent and other information.

.. figure:: /docimg/agent/agent_list.png
   :align: center

The colored circle representing the **State** can take 3 values:

- **Green**: Agent is reporting normally with the correct time.
- **Yellow**: Agent has not reported in over 20 minutes, or is reporting with the wrong time.
- **Red**: Agent has reported errors in recent log messages.

.. figure:: /docimg/agent/clock_offset.png
   :align: center

An agent's **Clock Offset** is the difference between the time reported by the
agent and the time recorded on our server. Incorrect time can produce anomalies
in metric data so it is advised to keep the agent's clock accurate.

You can delete the record of an agent from this page, but be aware that this
will not *uninstall* the agent. To uninstall an agent, :ref:`use your package
manager <uninstall-label>`.

Base system metrics
+++++++++++++++++++
.. figure:: /docimg/agent/base_dashboard.png
   :alt: Base system metrics dashboard
   :align: center

   Base system metrics dashboard

This dashboard displays many of the metrics reported by the Hosted Graphite
agent, and is available after you have installed your first agent.

You can find descriptions of how to read the base system metrics dashboard at
:doc:`base`.


Configuration
-------------
Agent configuration is minimal and done via
``/etc/opt/hg-agent/hg-agent.conf``. This is used to generate more complete
configuration for ``diamond`` in ``/var/opt/hg-agent/diamond.conf``.

Typically ``hg-agent.conf`` contains only an ``api_key``::

  api_key: YOUR-API-KEY

You can find the right value for this on your `Hosted Graphite account page
<https://www.hostedgraphite.com/>`_, but it should be filled in
automatically by the simple install process above.

Note that the agent takes control of ``diamond`` configuration: if you want
more nuanced control, you can run a separate ``diamond`` instance or whatever
metric collection system you wish. You can still take advantage of the agent's
authentication management and local buffering/forwarding facilities by
configuring it to send Graphite data to ``localhost``.

Optional Configuration
++++++++++++++++++++++
Metric path prefix
##################
You can supply a custom prefix instead of ``hg_agent``, e.g. to specify a host environment::

  custom_prefix: hg_agent.prodenv

though keep in mind that the neat :doc:`base` dashboard will no longer work for you.

You can also specify different methods of picking up the hostname, per
``hostname_method`` in `Diamond's config
<https://diamond.readthedocs.io/en/latest/Getting-Started/Configuration/#collector-settings>`_.
By default the agent uses ``smart``, but e.g. if you'd prefer the FQDN with
``.`` replaced by ``_``::

  hostname_method: fqdn

Proxies
#######
If your system requires a proxy to get ``HTTPS`` access to the Internet::

  https_proxy: http://10.10.1.10:1080

Local Metric Receiver / Forwarder
#################################
If you would like the receiver to listen on something other than the default
`Carbon <http://graphite.readthedocs.io/en/latest/feeding-carbon.html>`_ ports
(defaults shown)::

  tcp_port: 2003
  udp_port: 2003

If you'd like to keep more spool data for buffering locally during network
outages (defaults shown)::

  max_spool_count: 10
  spool_rotatesize: 10000000

Dedicated environments
######################
Large customers with dedicated Hosted Graphite environments may need to specify
metric data and metadata endpoints, e.g. for a cluster ``tst``::

  endpoint_url: https://tst.hostedgraphite.com/api/v1/sink
  heartbeat_url: https://heartbeat-tst.hostedgraphite.com/beat

MongoDB
#######
If you want the agent to monitor `MongoDB <https://www.mongodb.com/>`_ on a
host::

  mongodb:
      enabled: True
      host: localhost
      port: 27017

You can specify any of the keys from `Diamond's MongoDB config
<https://diamond.readthedocs.io/en/latest/collectors/MongoDBCollector/>`_ here.

Troubleshooting
---------------
You can check whether your ``hg-agent`` is reporting metadata to Hosted
Graphite via the `Agent list <https://www.hostedgraphite.com/app/agent/>`_, and
from there you can use the :doc:`base` dashboard to see if metric data is
flowing in. If not, you may need to dig a little deeper.

Logs are in ``/var/log/hg-agent``: you can see the metrics generated by
``diamond`` in ``archive.log``, as well as the various daemon logs
``supervisord.log``, ``diamond.log``, ``periodic.log``, and ``forwarder.log``
e.g. ::

  $ tail -f /var/log/hg-agent/forwarder.log

Process structure and other details are described in :doc:`layout`.

You can inspect the agent as a service like any other, e.g. on Ubuntu ``trusty``::

  $ sudo service hg-agent status

If you'd like to look at things from the agent's ``supervisor`` point of view::

  $ sudo /opt/hg-agent/bin/supervisorctl --config=/etc/opt/hg-agent/supervisor.conf status

Source Code
-----------
The sources used to build the agent can be followed at:

- https://github.com/hostedgraphite/hg-agent
- https://github.com/hostedgraphite/hg-agent-periodic
- https://github.com/hostedgraphite/hg-agent-forwarder

and are licensed under an `MIT license
<https://github.com/hostedgraphite/hg-agent/blob/master/LICENSE>`_.

Versions of Supervisor & Diamond included can be found in the `agent build
scripts <https://github.com/hostedgraphite/hg-agent/blob/master/build.sh>`_.

.. _uninstall-label:

Uninstall
---------
Hosted Graphite Agents can be uninstalled using your package manager.

For Debian-based systems::
	
	sudo apt-get remove hg-agent

For RHEL-based systems::

	sudo yum erase hg-agent

References
----------
.. toctree::
   :maxdepth: 1
   :glob:

   base
   layout