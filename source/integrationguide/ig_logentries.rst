
Logentries
===========

.. index:: Logentries

`Logentries <https://logentries.com/>`_ is a log management and analytics service, which takes log files and produces useful searchable information and statistics.

You can import Logentries data into Hosted Graphite using the `leexportpy <https://github.com/rapid7/leexportpy/>`_ tool.

Logentries have a `useful blog post <https://blog.rapid7.com/2016/07/05/introduction-to-leexportpy/>`_ to help you get started.

You just neeed to add your Hosted Graphite API key to ``config.ini``::

    [Services]
        [[hosted_graphite]]
            api_key = <Your API key>
