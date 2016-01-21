#### Utilities
#
# `$()` and `$val()` are simple utility functions for _jQuery-/Zepto_-style DOM stuff without importing the entire library
window.$ = (selector) ->
	elements = document.querySelectorAll selector
	if elements.length is 1 then elements[0] else elements

window.$val = (fieldname) ->
	elements = $("[name='#{fieldname}']")
	for radio in elements
		return radio.value if radio.checked

# Global app object
@app = window.app ? {}

#### Main Controller
#
# Build a new `ObjectDescriptor` to hold the object being built,
# Add the language radio buttons to the form and assign eventhandlers
# to the input fields
class ObjectBuilderController
	RETURN_KEY = 13
	
	constructor: () ->
		@currentObject = new ObjectDescriptor
		@addLanguagesToForm()
		@assignHandlers()
		@setFocusAndPickDefaultLanguage()
	
	assignHandlers: () ->
		# Assign change events
		($ '#name').addEventListener "change", @setObjectName, false
		($ '#property').addEventListener "change", @addProperty, false
		($ '#method').addEventListener "change", @addMethod, false
		for radio in ($ "[name='codelang']")
			radio.addEventListener "change", (() => @changed()), false
		# Assign keypress
		($ '#property').addEventListener "keypress", @handleKeypress, false
		($ '#method').addEventListener "keypress", @handleKeypress, false
	
#### Builders
# These methods take the value from the associated input field and calls the appropriate method on the `@currentObject`
	setObjectName: (e) =>
		val = e.target.value
		return @testObject() if val is "tester"
		@currentObject.name = val
		@changed()
	
	addProperty: (e) =>
		val = e.target.value
		@currentObject.addProperty val
		@changed()
	
	addMethod: (e) =>
		val = e.target.value
		@currentObject.addMethod val
		@changed()
	
	addLanguagesToForm: () ->
		index = 0
		radios = for name, language of app.Languages
			unless name is "Diagram"
				"<p class=\"radiofield\"><input type=\"radio\" value=\"#{name}\" name=\"codelang\" id=\"codelang-#{++index}\"><label for=\"codelang-#{index}\">#{name}</label></p>"
		($ ".language").innerHTML += radios.join "\n"
	
	testObject: () ->
		@currentObject = new ObjectDescriptor "Language"
		
		@currentObject.addMethod "renderInterface"
		@currentObject.addMethod "renderHTML"
		@currentObject.addProperty "name"
		@currentObject.addProperty "title"
		@changed()
	
	renderCode: (object, language) ->
		presenter = app.Languages[language]
		pre = presenter.renderInterface object

		codeWindow = $ '.output code'
		codeWindow.innerText = pre
		codeWindow.className = "language-#{presenter.prism}"
	
	renderObject: (object) ->
		presenter = app.Languages.Diagram
		code = presenter.renderInterface object
		
		diagramWindow = $ '.diagram'
		diagramWindow.innerHTML = code

	changed: () ->
		lang = $val('codelang')
		@renderObject @currentObject
		@renderCode @currentObject, lang
		Prism.highlightAll()
	
	handleKeypress: (e) =>
		input = e.target
		code = e.keyCode

		if code is RETURN_KEY
			input.select()

	setFocusAndPickDefaultLanguage: () ->
		($ '#codelang-1').checked = true
		($ '#name').focus()
		($ '#name').select()
		@changed()
		
# Start everything when the page is ready
app.controller = new ObjectBuilderController

#### Includes

# @codekit-prepend "Language.coffee"
# @codekit-prepend "ObjectDescriptor.coffee"
# @codekit-prepend "CoffeeScript.coffee"
# @codekit-prepend "XML.coffee"
# @codekit-prepend "JavaScript.coffee"
# @codekit-prepend "Swift.coffee"
# @codekit-prepend "Diagram.coffee"
