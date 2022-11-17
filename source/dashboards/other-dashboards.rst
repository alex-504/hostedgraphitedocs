
Other Dashboard Options
=======================


.. index:: Graphene, Graphiti, Tasseo, GDash

Graphite's default dashboard is powerful and full-featured, but suffers from being a ... little ugly.
There are several other dashboard options if you want to try something more attractive, including our favorite:  HG Primary Dashboards.

Using the :doc:`access keys </accountmanagement/access-keys>` features, you can allow an external dashboard or alerting system pull data from Hosted Graphite. Here are some options:


- | **Primary Dashboards**
  | A full-featured, interactive dashboarding tool. Now available within Hosted Graphite, just click the "Primary Dashboards" button on the top navigation bar.


- | **Graphene**
  | `https://github.com/jondot/graphene <https://github.com/jondot/graphene>`_ - A nice dashboard running on Rails using D3 to render the graphs.

- | **Graphiti**
  | `https://github.com/paperlesspost/graphiti <https://github.com/paperlesspost/graphiti>`_ - Using Sinatra and Redis to replace the Graphite web app.


- | **Tasseo**
  | `https://github.com/obfuscurity/tasseo <https://github.com/obfuscurity/tasseo>`_ - We run this natively, but you might want to run Jason Dixon's Tasseo dashboard yourself for some reason.


- | **GDash**
  | `https://github.com/ripienaar/gdash <https://github.com/ripienaar/gdash>`_ - Another Sinatra app, using Twitter Bootstrap for layout.
  |
  | **Configuration:** In dash.yaml, add


.. code-block:: php

     :graphite: https://www.hostedgraphite.com/your/accesskey/
