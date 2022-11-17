# -*- coding: utf-8 -*-
import sys, os
from datetime import datetime

# -- General configuration ----------------------------------------------------

#needs_sphinx = '1.0'
extensions = []
templates_path = ['_templates']  # Add any relative (to this dir) paths that contain templates
source_suffix = '.rst'
master_doc = 'index' # The master toctree document.
project = u'Hosted Graphite'
copyright = str(datetime.utcnow().year) + u', Hosted Graphite'

# replacement for |version| and |release|, among others
# [barry] leave commented out to suppress version number inclusion in the title
# The short X.Y version.
version = '1'
# The full version, including alpha/beta/rc tags.
#release = '1'

exclude_patterns = ["common/*", "obsolete/*" ]
pygments_style = 'sphinx'

# -- Options for HTML output ---------------------------------------------------
# [barry] http://sphinx.pocoo.org/theming.html says 'basic', 'default' (pythonesque),
# 'sphinxdoc' (sphinx website), 'scrolls', 'agogo', 'nature', 'pyramid', 'haiku',
# and 'traditional'.  ('epub' is a builtin for epub gen.)

# we're using custom hgdocs theme, based on the sphixdoc theme:
html_theme = 'sphinx_rtd_theme'
html_theme_path = ["../sphinx_themes"]
html_static_path = ['_static'] # path containing files to be overwritten

html_theme_options = {
	"sidebarwidth":300,
} 

html_logo = "docimg/HG2.png"
html_favicon = "docimg/hgdocsfavico.ico"


#html_last_updated_fmt = '%b %d, %Y'
#html_use_smartypants = True
#html_sidebars = {}
#html_additional_pages = {}
#html_domain_indices = True
#html_use_index = True
#html_split_index = False

# suppress 'show source'
html_show_sourcelink = False

html_show_sphinx = False
html_show_copyright = True

html_use_opensearch = 'https://www.hostedgraphite.com/docs/'
#html_file_suffix = None

htmlhelp_basename = 'HostedGraphitedoc'


# -- Options for LaTeX output --------------------------------------------------

latex_elements = {
# The paper size ('letterpaper' or 'a4paper').
#'papersize': 'letterpaper',

# The font size ('10pt', '11pt' or '12pt').
#'pointsize': '10pt',

# Additional stuff for the LaTeX preamble.
#'preamble': '',
}

# Grouping the document tree into LaTeX files. List of tuples
# (source start file, target name, title, author, documentclass [howto/manual]).
latex_documents = [
  ('index', 'HostedGraphite.tex', u'Hosted Graphite Documentation',
   u'Hosted Graphite', 'manual'),
]

# The name of an image file (relative to this directory) to place at the top of
# the title page.
#latex_logo = None

# For "manual" documents, if this is true, then toplevel headings are parts,
# not chapters.
#latex_use_parts = False

# If true, show page references after internal links.
#latex_show_pagerefs = False

# If true, show URL addresses after external links.
#latex_show_urls = False

# Documents to append as an appendix to all manuals.
#latex_appendices = []

# If false, no module index is generated.
#latex_domain_indices = True


# -- Options for manual page output --------------------------------------------

# One entry per manual page. List of tuples
# (source start file, name, description, authors, manual section).
man_pages = [
    ('index', 'hostedgraphite', u'Hosted Graphite Documentation',
     [u'Hosted Graphite'], 1)
]

# If true, show URL addresses after external links.
#man_show_urls = False


# -- Options for Texinfo output ------------------------------------------------

# Grouping the document tree into Texinfo files. List of tuples
# (source start file, target name, title, author,
#  dir menu entry, description, category)
texinfo_documents = [
  ('index', 'HostedGraphite', u'Hosted Graphite Documentation',
   u'Hosted Graphite', 'HostedGraphite', 'One line description of project.',
   'Miscellaneous'),
]

# Documents to append as an appendix to all manuals.
#texinfo_appendices = []

# If false, no module index is generated.
#texinfo_domain_indices = True

# How to display URL addresses: 'footnote', 'no', or 'inline'.
#texinfo_show_urls = 'footnote'


# -- Options for Epub output ---------------------------------------------------

# Bibliographic Dublin Core info.
epub_title = u'Hosted Graphite'
epub_author = u'Hosted Graphite'
epub_publisher = u'Hosted Graphite'
#epub_copyright = u'2012, Hosted Graphite'

# The language of the text. It defaults to the language option
# or en if the language is not set.
#epub_language = ''

# The scheme of the identifier. Typical schemes are ISBN or URL.
#epub_scheme = ''

# The unique identifier of the text. This can be a ISBN number
# or the project homepage.
#epub_identifier = ''

# A unique identification for the text.
#epub_uid = ''

# A tuple containing the cover image and cover page html template filenames.
#epub_cover = ()

# HTML files that should be inserted before the pages created by sphinx.
# The format is a list of tuples containing the path and title.
#epub_pre_files = []

# HTML files shat should be inserted after the pages created by sphinx.
# The format is a list of tuples containing the path and title.
#epub_post_files = []

# A list of files that should not be packed into the epub file.
#epub_exclude_files = []

# The depth of the table of contents in toc.ncx.
#epub_tocdepth = 3

# Allow duplicate toc entries.
#epub_tocdup = True
