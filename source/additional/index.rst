
Additional Features
===================

In this guide we'll discuss some of the additional features that hosted graphite has to offer.

.. we'll just glob all files in this dir that begin with ig_.  (I don't just glob *, as there's a 
   common_getenvkey.rst file that is an include, so I don't want it in the ToC. 
   (Alternatively, get rid of the glob and list the files manually)

.. toctree::
   :maxdepth: 1
   :glob: 
  
   *

.. All rst files must be referenced in a toctree somewhere, or you'll get warnings when building.  
   To suppress warnings about the getenvkey doc (it's an include), we'll just use a hidden toctree

.. toctree::
   :hidden:
