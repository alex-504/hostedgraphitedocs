
Using Your Own Alerting
========================

.. index:: Alerting, alerts, email alerts,

If you feel you need complex graphite :ref:`hg-alerting` features that we don't yet support there are several great open source projects to provide alerting on your metrics.

Two well-maintained projects are `Cabot <https://github.com/arachnys/cabot>`_ and `Seyren <https://github.com/scobal/seyren>`_.


Connecting Hosted Graphite to Open Source Alerting Tools
--------------------------------------------------------

Connecting Hosted Graphite to open source Alerting tools is a simple process.

- | First you need to create an :doc:`access key </accountmanagement/access-keys>`.
- | Right click the URL of the access key, and copy it.
- | Use this value as your Graphite URL in your alerting system.


.. index:: Cabot, Alerting with Cabot

Using Hosted Graphite with Cabot
---------------------------------

.. code-block:: java

    GRAPHITE_API: Your Access Key URL
    GRAPHITE_USER:
    GRAPHITE_PASS:
    GRAPHITE_FROM: -10min


Both **GRAPHITE_USER** and **GRAPHITE_PASS** should be left empty, they're not necessary when using the Access Key.

Note **GRAPHITE_API** should end with a '\/' character.


.. index:: Seyren, Alerting with Seyren

Using Hosted Graphite with Seyren
----------------------------------

Set the **GRAPHITE_URL** to your Access key URL as either a system property or an environment variable when starting Seyren.
In the simplest case:

.. code-block:: bash

   export GRAPHITE_URL=Your access Key URL
   java -jar seyren-1.2.0.jar
   open http://localhost:8080
