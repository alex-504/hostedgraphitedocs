hgdocs
======

[![Circle CI](https://circleci.com/gh/metricfire/hgdocs.svg?style=svg&circle-token=8d00ce57fb7dbf39ed3a11cc99a25d100f994b61)](https://circleci.com/gh/metricfire/hgdocs)

Dependencies:
-------------

The only dependency is the  [Sphinx Document Generator](http://sphinx.pocoo.org/).  For ubuntu/mint, simply run:

    sudo apt-get install python-sphinx


Project Structure
------------------

The project root contains a **source/** directory containing the rst formatted documentation.  When the source is built, a **build/**
directory is created (if it doesn't already exist, .gitignore excludes it), and the content is generated into a further subdirectory.
That subdirectory is named **html** if HTML was built. (run 'make' with no arguments in the project root to see other output format choices).

**Building HTML**

If you're on windows, there's **make.bat**, otherwise, use standard **make**.  The *sphinx-build* utility must be on your path.  Build the site with:

    hgdocs $ make html

    sphinx-build -b html -d build/doctrees   source build/html
    Making output directory...
    Running Sphinx v1.1.3
    building [html]: targets for 5 source files that are out of date
    .... snip ...
    dumping object inventory... done
    build succeeded.
    Build finished. The HTML pages are in build/html.
 

Useful Docs:
------------

* [Intro to Sphinx](http://sphinx.pocoo.org/tutorial.html)
* [Intro to reStructuredText](http://sphinx.pocoo.org/rest.html#rst-primer)
* [Quickref for reStructuredText](http://docutils.sourceforge.net/docs/user/rst/quickref.html)
* [reST and Sphinx Cheatsheet](http://thomas-cokelaer.info/tutorials/sphinx/rest_syntax.html)

Making changes:
---------------

  1. Make your changes to the source (in a new branch).

  2. Use the above instructions to generate HTML.

  3. Test the changes locally in your browser. (file:///foo/bar).

   a) Alternatively go to [https://circleci.com/gh/metricfire/hgdocs](https://circleci.com/gh/metricfire/hgdocs) check for your branch name.

   b) In the "artifacts" section locate the .html file(s) that you have changed.

   c) Click on those files to view/test your changes in browser.

  4. Merge your branch to master, and Circle will build a .deb package and deploy it to the package repo.

  5. Run a puppetrun on all the prod webservers so that they are updated with the new docs package.

   a) You can find the build number for the package by going to https://circleci.com/gh/metricfire/hgdocs and reading the build number as the number after the # in the latest build.

   b) This can be done by using the justdeploy command in the chat channel, with the current build number.

   c) e.g. `glitter: justdeploy --project hgdocs website@production --version=1.0-XXX` where XXX is the build number.

  6. Wait for [hostedgraphite.com/docs](https://www.hostedgraphite.com/docs/) to show your changes.

