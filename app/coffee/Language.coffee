# Get the global app object 
@app = window.app ? {}

# Keep a lookup variable for the available languages
@app.Languages = { }

#### Language
# The `Language` class is the base for languages we're oping to support,
# so that every new language supports the basic operations, `renderInterface()`
# being the prime contender at the moment.
# 
#  `@template` is the name of the eco template for rendering the language
#  `@prism` is the name of the [Prism](http://prismjs.com) language to use for syntax highlighting.
class Language
	constructor: (@name, options = {}) ->
		@template = options.template ? @name.toLowerCase()
		@prism = options.prism ? @name.toLowerCase()
		app.Languages[@name] = @

	renderInterface: (object) ->
		ecoTemplates[@template](object)

