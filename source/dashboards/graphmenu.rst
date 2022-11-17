
Graphite Graph Menu Reference
=============================

.. index:: Graph Menu

The Graphite composer is a very powerful tool, with many options.  We'll document some of the more commonly used visualization options here. See the `Graphite docs <https://graphite.readthedocs.io/en/latest/functions.html>`_ for a full list of functions that you can apply to your metric queries.

- **Graph Options**
	- | **Graph Title**
	  | Set the title at the top of the graph.
	- | **Display**
	  | Control fonts, colors, and other stylings as well as toggling display of items such as grid lines and axes.
	- | **Line Mode**
	  | Control how adjacent data points for a metric are connected:
	  
		- **Slope Line** - The graph line through adjacent data points results in a sloped path.
		- **Staircase Line** - The graph line through adjacent data points results in a 'stepped' path.
		- **Connected Line** - Creates a continuous sloped path, filling gaps between data points (see note below).
		- **Draw Null As Zero** - Assume that a missing metric value for a given time point is the same as that metric equaling 0.
		
	  | *Note* - For 'Slope Line' and 'Staircase Line' it is assumed that data points are close enough together or that the graph resolution is coarse enough to result in a connected path.  Using 'Connected Line' is similar to 'Slope Line' but renders a continuous path.  For those wishing to use 'Staircase Line' but are seeing gaps, you can apply the `Keep Last Value <https://graphite.readthedocs.io/en/latest/functions.html#graphite.render.functions.keepLastValue>`_ function (**Graph Data** -> (choose metric) -> **Apply Function** -> **Special** -> **Keep Last Value**).
	
	- | **Area Mode**
	  | Control how the area under a graph path is filled:
	  
		- **None** - No fill. 
		- **First Only** - The graph of the first metric (if you have several) has a solid fill underneath.
		- **Stacked** - All graphs lines are filled underneath, with a different fill color for each metric.  The order in which the metrics are added to the graph determines the fill order.
	  
	- | **X-Axis**
	
		- **Time Format** - Apply a date format to the timestamps using `Python's strftime() format <http://docs.python.org/library/time.html#time.strftime>`_.
		- **Timezone** - Apply the appropriate offset to the timestamp values based on the provided timezone, e.g. ``America/Los_Angeles`` or ``Europe/Dublin``.
		
	- | **Y-Axis**

		- **Label** - Apply a label to the vertical axis.
		- **Minimum** - Values below this will not be included in the graph.
		- **Maximum** - Values above this will not be included in the graph. 
		- **Minor Lines** - How many of the minor grid lines will be rendered.
		- **Unit** - Control unit rendering (e.g., 1K instead of 1000).
		- **Side** - Whether to render the Axis on the left or the right side of the graph.
			
- | **Graph Data**
  | This menu allows you to add multiple metrics to your graph (or even the same metric multiple times).  It also allows you to perform transformations on your metric data before rendering, allowing for comparisons or more complex analysis of your data.  There are far too many possibilities to document in this beginner's guide.  (A simple example would be a graphing both "Authenticated" vs "Anonymous" users at the same time.  Another example could be to add our ``conc_users`` data twice, but apply a -1 year time shift to the second instance, so we could compare traffic this time last year. The possiblities are endless!).

- | **Auto Refresh**
  | When enabled, the graph will automatically refresh.


