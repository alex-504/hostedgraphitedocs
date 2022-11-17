.. index:: Dashboards

Graphite Dashboard Guide
========================

.. contents::

In the following guide, we'll walk you through creating a simple Graphite graph for a chosen metric, and adding that to a dashboard that you can bookmark for quick access. If you haven't sent any metrics to Hosted Graphite yet, check out our :doc:`Sending Metrics Guide </sendingmetrics/index>`.

:ref:`In this example <a-simple-example>`, we're using a metric called ``conc_users`` - the number of users logged into our imaginary application. We have been sending the metric value (such as the one below) once a minute to Hosted Graphite for the last day.  ::

        conc_users 1215

.. index:: Creating a Graph

Creating a Graph
----------------
Let's setup a graph for our ``conc_users`` metric.  Log into Hosted Graphite, navigate to Dashboards and select **Graphite Composer**.

.. _choose_metric_tree:

When that opens, you'll be presented with a blank composer dialog.  On the tree on the left hand side, expand the 'Graphite' folder.  This will contain all the metrics 
sent using the :ref:`API Key <api-key>` associated with your account.  At the moment, there's only one entry - our demo ``conc_user`` metric, so we click on that.

.. figure:: /docimg/composer-choosemetric.png
   :height: 140px
   :alt: Choosing A Metric
   :align: center

   Choosing our ``conc_user`` metric
   
**Tip**: If you're going to be sending a wide range of metrics to a Hosted Graphite account, this 'Graphite' folder could soon have an unmanageable number of entries.  
Using periods in your :ref:`metric names <metric-data-format>` will introduce a folder structure, allowing for logical grouping of your metrics.  
E.g. ``servers.mario.memory.free`` will result in ``Graphite\servers\mario\memory\free`` in the tree above. 
See the `Graphite Project website <https://graphite.readthedocs.io/en/latest/feeding-carbon.html#step-1-plan-a-naming-hierarchy>`_ for more info.

When we click on our ``conc_users`` metric, Graphite will render a graph of a recent selection that metric data:

.. figure:: /docimg/composer-initialgraph.png
   :height: 400px
   :alt: Initial conc_user graph
   :align: center

   A graph of the ``conc_user`` metric after clicking on the ``conc_user`` entry


.. index:: Time Ranges

Choosing a Time Range
---------------------

The next thing we do is to choose how much of our data we're going to sample.  We have two options, via the following icons:

.. _dashboardguide-daterange:

.. figure:: /docimg/composer-timerangebuttons.png
   :alt: Time Selection
   :align: center

   '*Select A Date Range*' and '*Select Recent Data*' buttons
   
- | **Select A Date Range**
  | Choose a start date/time and an end date/time.  This is useful for debugging a new metric, or for investigating an incident that occurred during a specific time window.  
- | **Select Recent Data**
  | View a rolling window of the most recent metric data, up to a specified number of minutes/hours/days/weeks/months/years.
  
**Tip** - If you make changes but the graph doesn't update automatically, use the **Update Graph** button to trigger a refresh of the graph.

.. figure:: /docimg/composer-refreshbutton.png
   :alt: Refresh Button
   :align: center

   '*Update Graph*' Button

In this example, we want a view of the last 12 hours of the ``conc_users`` metric, so click **Select Recent Data** and enter the appropriate values. 

Graph Labeling and Styling
--------------------------

There are many options to make your data more presentable.  At the bottom of the composer window, you'll find a group of menus. These contain
various functions to let you apply data transformations, labeling and styling to your graph:

.. figure:: /docimg/composer-bottom-buttons.png
   :alt: Composer Menu
   :align: center

   Composer Menus

In this example, we'll use only a few of the many available options.  You can find more information about the menus in the :doc:`graph menu guide </dashboards/graphmenu>`.
Let's make the following adjustments to our graph:

- | **Graph Options** -> **Line Mode** -> **Connected Line**
  | Makes our graph a continuous line through our available metric points.
- | **Graph Options** -> **Graph Title**
  | Sets the title to ``Site Visitors``.
- | **Graph Options** -> **Display** -> **Line Thickness**
  | Set this value to ``3`` (pixels) for a slightly thicker line than the default.
- | **Graph Options** -> **X-Axis** -> **TimeZone**
  | Metric timestamps are sent in UTC.  The server (in this example) sending the metrics is in Dublin - Set this to ``Europe/Dublin`` to apply the appropriate offset to the X-axis timestamps.
- | **Graph Options** -> **Y-Axis** -> **Label**
  | Set the vertical axis label to ``Users``.
 
This results in the following:

.. figure:: /docimg/composer-initialgraph-improved.png
   :height: 400px
   :alt: Initial conc_user graph, improved!
   :align: center

   A improved graph of the ``conc_user`` metric

Click on the floppy disk icon in the composer toolbar to save.  You'll be prompted for a name, enter ``Site Visitors`` and click OK.  Your graph is now saved, and can be 
recalled at any time by browsing **My Graphs** in the left hand window of the Composer. 

.. _creating_a_dashboard:

Creating a Graphite Dashboard
-----------------------------
The final step in this tutorial is to create a bookmarkable Graphite dashboard and add your graph for display.  Having followed the tutorial above, we will have a new ``Site Visitors`` graph in our account. Navigate to Dashboards -> Graphite Composer -> Dashboard in your Hosted Graphite account.

When you first open the dashboard page, you'll be presented with a blank dashboard. Go to **Graphs** -> **New Graph** -> **From Saved Graph**

.. figure:: /docimg/dashboard-menu-loadgraph.png
   :width: 800px
   :alt: Load your Graph
   :align: center

   Loading our saved Graph

In the dialog that opens, an entry called ``Site Visitors`` will appear.  Choose it and then click **Select**.  
Your graph will appear in the dashboard.  Let's make our graph a little bigger.  Click on **Graphs** -> **Resize**, and choose the ``Custom`` option.  
Enter in a width of ``800`` and a height of ``500`` (or whatever suits your display).  

**Tip** You can further customize the graphs for this dashboard instance by clicking a graph once to focus it, and clicking once more to bring up a configuration menu
(This is the same menu we used when creating the graph - See :doc:`/dashboards/graphmenu` for more info).


.. figure:: /docimg/dashboard-with-graph.png
   :width: 800px
   :alt: Load your Graph
   :align: center

   Our Final Dashboard!

.. _dashboardguide_savedash:

Saving and Loading Dashboards
-----------------------------

To save your finished dashboard, click **Dashboard** -> **Save As** and enter a name, e.g. ``MainSiteDash``.

To get a bookmarkable URL (which will directly open this dashboard instance), click on **Share** in the menu.  A dialog will appear (you may be asked to save again) containing a URL that you can copy.  

Finally, you can see all dashboards that you own by clicking **Dashboard** -> **Finder**.  A dialog will appear with a list of all the dashboards that you have saved.


Advanced Dashboard Configuration
--------------------------------

**Graph Data**

In :ref:`Creating A Dashboard <creating_a_dashboard>`, we created a simple graph with some basic styling.
Graphite offers many more configuration options.  You have the ability to show multiple metrics in the same graph,
apply transformations to the metric data, or combine metrics before rendering.  All of these advanced features are
found via the **Graph Data** button:

.. figure:: /docimg/composer-graphdata-button.png
   :alt: Graph Data Button
   :align: center

   *Graph Data* button


Each time a metric is selected (in the :ref:`tree of metrics <choose_metric_tree>`), an entry called a 'target'
is added to the Graph Data dialog.  For example, had we clicked on metric **\\servers\\smithers\\users_authed** and then
metric **\\servers\\smithers\\users_guest** in the composer, the **Graph Data** dialog would contain two targets as follows
(which would each result in a line on the graph):

.. figure:: /docimg/composer-graphdata-2metrics-simple.png
   :alt: Graph Data with Two Metrics
   :align: center

   *Graph Data* Dialog with Two Targets

.. _graph_target_wildcards:

**Wildcards**

Sometimes we want to display groups of common metrics.  Rather than manually adding each metric as a target, we
can use wildcards to specify multiple metrics as one target.  Using the **Edit** button in the Graph Data dialog,
we can manually specify the target as in the following examples:

- | To graph all the metrics under the **smithers** server:
  | Set the target as **servers.smithers.***
- | To graph the **users_authed** metric on all servers:
  | Set the target as **servers.*.users_authed**

.. _graph_target_performance:

**Graph Performance**

If you have many metrics stored with us, and your graphs are taking a long time to load, chances are that your
:ref:`wildcard use <graph_target_wildcards>` is the first place you should look.  Try to avoid wildcards such
as the following ::

    servers.*.*.cpu

In this case, every single metric matched by this wildcard will be queried, even if many of those metrics don't
have data for the selected time range.  Multiple, but narrower targets in a graph may result in faster
load times than one widely defined target.

In our example above, perhaps all we care about are our metrics regarding public-facing machines, but our wildcard
is also including metrics from our production or staging machines.  In this scenario, we replace the single target
with two narrower targets, e.g.:  ::

    servers.production.*.cpu
    servers.staging.*.cpu


**Data Transformations**

Now that we've defined *which* metrics we're interested in, we can perform transformations on them.
Back in the **Graph Data** dialog, when we select a target (or multiple targets), we can use the **Apply Function**
menu to alter or combine our targets in some way.  When a function is applied to a target, you'll notice that the
target's text changes, eg ::

    before: original_target_text

    after:  functionName(original_target_text)   or
            functionName(original_target_text, optional_params..)

Eg,  if we selected *conc_users*, and clicked **Apply Function** --> **Transform** --> **Derivative**, the target
text would now say ::

    derivative(conc_users)

The graph should automatically update to show the derivative of our *conc_users* metric.  If not, click the refresh button.
If several transformations are applied to a target, the function calls are nested, with the most recent one on
the outside.  E.g. ::

    lastFunction(secondFunction(firstFunction(original_target)))

To undo a function you just applied, click the target and use the **Undo Function**.  The outermost function will
be removed from the target text. You don't have to use the **Apply Function** menu - you may also select your target,
click **Edit**, then manually edit the target text by hand.

A quick summary of the **Apply Function** menu is as follows.  Some functions are used on multiple targets (either
by selecting multiple entries in the dialog, using wildcards, or both). More information about functions can be
found on the *Functions* page on the `Graphite Docs Page <https://graphite.readthedocs.io/>`_.


- | **Combine**
  | Combining the datapoints from multiple metrics using functions such as **sum()**
- | **Transform**
  | Create a new set of datapoints after applying a transformation such as derivation or timeshifting to the input.
- | **Calculate**
  | Perform running calculations on the datapoints such as a moving average, or forecasts.
- | **Filter**
  | Discard, limit or maintain counts/maximums/minimums of the datapoints.
- | **Special**
  | Miscellaneous functions, that mostly contain routines that control the appearance of that target on the graph - For example setting a legend name, or line color.


