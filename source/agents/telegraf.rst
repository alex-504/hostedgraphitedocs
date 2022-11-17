Telegraf
========

Telegraf is an easy to use monitoring client compatible with many operating systems (Windows, Macos, Linux, Red Hat & CentOS) that has a Graphite output plugin, and many useful input plugins for collecting a wide variety of system metrics.

.. contents::
      
.. index:: linux

Linux Systems
-------------
    
1. Download Telegraf and unzip it (see the `telegraf docs <https://portal.influxdata.com/downloads>`_ for up-to-date versions and installation commands for many operating systems). Packages and files are generally installed at ``/etc/telegraf/``.
      
**Ubuntu/Debian**
      
.. code-block:: none
      
    wget https://dl.influxdata.com/telegraf/releases/telegraf_1.21.2-1_amd64.deb
    sudo dpkg -i telegraf_1.21.2-1_amd64.deb
        
**RedHat/CentOS**
      
.. code-block:: none
      
    wget https://dl.influxdata.com/telegraf/releases/telegraf-1.21.4-1.x86_64.rpm
    sudo yum localinstall telegraf-1.21.4-1.x86_64.rpm
        
2. Locate the configuration file at ``/etc/telegraf/telegraf.conf`` and open it in your preferred text editor, or a VIM shell. Make the following changes to the telegraf.conf file:
      
    - | comment out the ``[[outputs.influxdb]]``
    - | uncomment the ``[[outputs.graphite]]``
    - | uncomment and edit the servers line to: ``servers = ["carbon.hostedgraphite.com:2003"]``
    - | uncomment and edit the prefix line to: ``prefix = "YOUR_API_KEY.telegraf"`` 
    - | alternatively, you can download a preconfigured telegraf.conf file from the Agents => Telegraf section in the Hosted Graphite application. Download the preconfigured file, move it to ``/etc/telegraf``, and replace the original.
       
.. figure:: /docimg/configure-telegraf.png
      :scale: 100%
      :alt: configure the telegraf.conf file
      :align: center
       
3. Save changes and start telegraf services: ``sudo service telegraf start`` or ``sudo systemctl start telegraf``. 
4. Within minutes, telegraf will start sending metrics into your Hosted Graphite account (with the 'telegraf' prefix).
5. Troubleshoot errors by running telegraf in the root directory of the telegraf.conf file: ``telegraf --config telegraf.conf``. **Note:** The influxdb output plugin is enabled by default and this will cause an error message that's visible in the output when you 'serve' telegraf. To clear this error, make sure you comment out the ``[[outputs.influxdb]]`` line in the telegraf.conf file.
       
.. index:: macos

Macos
-----
      
1. Install Telegraf: ``brew install telegraf``. Packages are usually installed at ``/usr/local/etc/``
2. Similar to the Linux steps listed above, locate the configuration file and open it in your preferred text editor. Make the following changes to the telegraf.conf file:
      
  - | comment out the ``[[outputs.influxdb]]`` line
  - | uncomment the ``[[outputs.graphite]]`` line
  - | uncomment and edit the 'servers' line to: ``servers = ["carbon.hostedgraphite.com:2003"]``
  - | uncomment and edit the 'prefix' line to: ``prefix = "YOUR_API_KEY.telegraf"``
       
3. Restart telegraf: ``brew services restart telegraf``. Metrics usually take about 3-5 minutes to appear in your Hosted Graphite account and will include the 'telegraf' prefix in the name.
4. Additionally, you can 'serve' the telegraf.conf file which can be helpful for troubleshooting any configuration issues: ``telegraf --config telegraf.conf``    
      

.. index:: windows

Windows (via Powershell)
------------------------

1. Download Telegraf using the wget commend (an alias for Invoke-Webrequest) and unzip it:

.. code-block:: none

    wget https://dl.influxdata.com/telegraf/releases/telegraf-1.5.2_windows_amd64.zip -O telegraf-1.5.2_windows_amd64.zip
    Expand-Archive .\telegraf-1.5.2_windows_amd64.zip

Note: The link for the most up-to-date version of the config file can be found on the `Telegraf downloads page <https://portal.influxdata.com/downloads>`_.

2. Create a directory in Program Files, move the two telegraf files into it, and change directory to the same location:

.. code-block:: none

    mkdir 'C:\Program Files\Telegraf'
    mv .\telegraf-1.5.2_windows_amd64\telegraf\*.* 'C:\Program Files\Telegraf'
    cd 'C:\Program Files\Telegraf'

3. Create a new configuration file which includes the Graphite output-filter.

.. code-block:: none

    ./telegraf.exe --output-filter graphite config > telegraf.conf

4. Open the telegraf.conf file using your preferred text editor. Find the section titled **[[outputs.graphite]]** and change the servers and prefix options:

.. code-block:: none

    servers = ["carbon.hostedgraphite.com:2003"]
    prefix = "YOUR-API-KEY.telegraf"

.. figure:: /docimg/gettingstarted/configchange-telegraf.png
      :scale: 100%
      :alt: insert your account details into the telegraf config file
      :align: center

      The graphite output section of the telegraf configuration file

5. Install telegraf to your services, and start it up:

.. code-block:: none

    ./telegraf.exe -service install -config 'C:\Program Files\telegraf\telegraf.conf'
    net start telegraf

Metrics will now appear in your Hosted Graphite account with the 'telegraf' prefix. More options for collecting Windows metrics include using the Windows Performance Counters plugin, which you can read more about in the `win_perf_counters docs <https://github.com/influxdata/telegraf/blob/master/plugins/inputs/win_perf_counters/README.md>`_).
         
.. index:: telegraf input plugins

Telegraf Input Plugins
----------------------

We love the Telegraf agent because it offers a wide variety of easy to install `input plugins <https://docs.influxdata.com/telegraf/v1.10/plugins/inputs/>`_ that allow you to collect additional metrics from a range of popular services and technologies like:

- Database (MySQL, PostgreSQL, MongoDB, Redis, Riak, RethinkDB)
- Network (SNMP, Cisco Telemetry, Nstat, SFlow, IPtables, Bond, Ethtool, LeoFS, InfiniBand, JTI, Ping)
- DNS (Unbound, PowerDNS, NSD)
- MQTT (RabbitMQ, ActiveMQ)
- Apache (Aurora, Kafka, Mesos, Solr, Tomcat, CouchDB, Zipkin)
- GCP: (Stackdriver, PubSub)
- System Applications/Running Processes: (Procstat, Monit, Processes)
- Other: (Kubernetes, Jenkins, Jolikia, Elasticsearch, Logstash, Kibana, Nginx, HAproxy, uWSGI, Docker, GitHub, Mailchimp, Salesforce, and many more!)

If you need help or advice on configuring the telegraf agent to include some input plugins, send us a message at `support@hostedgraphite.com <mailto:support@hostedgraphite.com>`_ and we would be happy to walk you through the process.
    
