
Ruby
====

.. index:: Ruby, ruby gem


Installing the Ruby Gem
-----------------------

A `Hosted Graphite Ruby Gem <https://rubygems.org/gems/hosted_graphite>`_ is available on github, and can be installed directly
by typing:

.. code-block:: bash

    gem install hosted_graphite


Using the Gem to send via TCP
-----------------------------

.. code-block:: ruby

    HostedGraphite.protocol = HostedGraphite::TCP
    HostedGraphite.send_metric('foo.tcp', 1.2)

Using the Gem to send via UDP
-----------------------------

.. code-block:: ruby

    HostedGraphite.protocol = HostedGraphite::UDP
    HostedGraphite.send_metric('foo.udp', 1.2)


Using the Gem to send via HTTP
------------------------------

.. code-block:: ruby

    HostedGraphite.protocol = HostedGraphite::HTTP
    HostedGraphite.send_metric('foo.http', 1.2)


Using the Gem to send via StatsD
--------------------------------

.. code-block:: ruby

    require 'hosted_graphite'
    require 'statsd-ruby'
    
    HostedGraphite.api_key = '<your-api-key>'
    HostedGraphite.protocol = :statsd
    HostedGraphite.<gauge-count-or-timing>('foo.statsd', 1.2)


Basic Ruby
----------

Here are some ways to send via TCP, UDP and HTTP directly in your code.


Sending a metric via TCP
------------------------

.. code-block:: ruby
    
    require 'socket'

    conn = TCPSocket.new 'YOUR-UID.carbon.hostedgraphite.com', 2003
    conn.puts "YOUR-API-KEY.foo 1.2\n"
    conn.close


Sending a metric via UDP
------------------------

.. code-block:: ruby
    
    require 'socket'

    sock = UDPSocket.new
    sock.send "YOUR-API-KEY.foo 1.2\n", 0, "YOUR-UID.carbon.hostedgraphite.com", 2003


Sending a metric via HTTP POST
------------------------------

.. code-block:: ruby

    require 'net/http'

    uri = URI("https://www.hostedgraphite.com/api/v1/sink")
    api_key = "YOUR-API-KEY"

    req = Net::HTTP::Post.new(uri.request_uri)
    req.basic_auth api_key, nil 
    req.body = "foo 1.2"

    res = Net::HTTP.start(uri.host, uri.port) do |http|
      http.request(req)
    end


.. include:: ../common/common_getapikey.rst
.. raw:: html

    <script src="../_static/uid_prefix.js"></script>