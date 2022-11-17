.. this file is an include from the other add-on guide docs that setup 
   a HOSTEDGRAPHITE_APIKEY env variable. 

Accessing the API Key within your app
-------------------------------------

Now that the add-on has been setup, the Hosted Graphite :ref:`API Key <api-key>` will be available via the environment variable **HOSTEDGRAPHITE_APIKEY**. 
See the appropriate language snippet below for an example on how to access this variable in your app. 

**Ruby**

.. code-block:: ruby
    
	apikey = ENV['HOSTEDGRAPHITE_APIKEY']	

See also: :doc:`Sending Metrics with Ruby </languageguide/lg_ruby>`

**Python**
	
.. code-block:: python
    
	apikey = os.environ['HOSTEDGRAPHITE_APIKEY']

See also: :doc:`Sending Metrics with Python </languageguide/lg_python>` 
	
**Java**
	
.. code-block:: java

    String apikey = System.getenv("HOSTEDGRAPHITE_APIKEY");

See also: :doc:`Sending Metrics with Java </languageguide/lg_java>`

**PHP**
	
.. code-block:: php

	$apikey = getenv('HOSTEDGRAPHITE_APIKEY');
	
See also: :doc:`Sending Metrics with PHP </languageguide/lg_php>`

**Node.js**
		
.. code-block:: javascript

    var apikey = process.env.HOSTEDGRAPHITE_APIKEY;

See also: :doc:`Sending Metrics with Node.js </languageguide/lg_nodejs>`


