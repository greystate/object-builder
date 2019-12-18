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
self.app ?= {}

#### Main Controller
#
# Build a new `ObjectDescriptor` to hold the object being built,
# Add the language radio buttons to the form and assign eventhandlers
# to the input fields
class ObjectBuilderController
	RETURN_KEY = 13
	validRE = ///
		^
		[^\s,\.()-]+
		$
	///
	
	constructor: () ->
		@currentObject = new ObjectDescriptor
		@library = new Library $('.library'), self.app.Languages.Diagram
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
		($ ".library").addEventListener "click", @libraryClickHandler, false
		
		# Assign keypress
		($ '#name').addEventListener "keypress", @handleKeypress, false
		($ '#property').addEventListener "keypress", @handleKeypress, false
		($ '#method').addEventListener "keypress", @handleKeypress, false
		
		# Hook up the Save button
		($ '#save').addEventListener "click", @saveCurrentObjectToLibrary, false
		
		# Light validation warning
		for textfield in ($ 'input[type="text"]')
			textfield.addEventListener "keyup", @validityChecker, false

	libraryClickHandler: (e) =>
		target = e.srcElement
		needle = target
		needle = needle.parentNode until needle.nodeName is "DIV"
		
		index = needle.dataset.libraryIndex
		if index >= 0
			@loadObjectIntoCurrentObject (@library.get index).clone()
		

		

	validityChecker: (e) ->
		field = e.target
		if field.value.length is 0
			field.classList.remove "invalid"
		else
			ok = validRE.test field.value
			field.classList.toggle "invalid", not ok


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
	
	reset: ->
		@currentObject = new ObjectDescriptor
		@changed()
		@resetForm()
	
	addLanguagesToForm: () ->
		index = 0
		radios = for name, language of self.app.Languages
			unless name is "Diagram"
				"<p class=\"radiofield\"><input type=\"radio\" value=\"#{name}\" name=\"codelang\" id=\"codelang-#{++index}\"><label for=\"codelang-#{index}\">#{name}</label></p>"
		($ ".language").innerHTML += radios.join "\n"
	
	saveCurrentObjectToLibrary: (e) =>
		e.preventDefault()
		@library.add @currentObject.clone()
		@reset()
	
	loadObjectIntoCurrentObject: (object) ->
		@currentObject = object
		@changed()
		
	removeObject: (index) ->
		# body
	
	resetForm: ->
		($ '#name').value = ""
		($ '#property').value = ""
		($ '#method').value = ""
		($ '#name').focus()
	
	testObject: () ->
		@currentObject = new ObjectDescriptor "ObjectDescriptor"
		
		@currentObject.addMethod "addMethod"
		@currentObject.addMethod "addProperty"
		@currentObject.addMethod "clone"
		
		@currentObject.addProperty "memberlist{}"
		@currentObject.addProperty "methods[]"
		@currentObject.addProperty "properties[]"
		@changed()
	
	renderCode: (object, language) ->
		presenter = self.app.Languages[language]
		pre = presenter.renderInterface object

		codeWindow = $ '.output code'
		codeWindow.innerText = pre
		codeWindow.className = "language-#{presenter.prism}"
	
	renderObject: (object) ->
		presenter = self.app.Languages.Diagram
		code = presenter.renderInterface object
		
		diagramWindow = $ '.diagram'
		diagramWindow.innerHTML = code
	
	changed: () ->
		lang = $val('codelang')
		@renderObject @currentObject
		if lang?
			@renderCode @currentObject, lang
			Prism.highlightAll()
	
	handleKeypress: (e) =>
		input = e.target
		code = e.keyCode

		if code is RETURN_KEY
			if input.id is "name"
				($ '#property').select()
			else
				input.select()

	setFocusAndPickDefaultLanguage: () ->
		($ '#codelang-1').checked = true
		($ '#name').focus()
		($ '#name').select()
		@changed()
		
# Start everything when the page is ready
self.app.controller = new ObjectBuilderController

#### Includes

# @codekit-prepend "Language.coffee"
# @codekit-prepend "ObjectDescriptor.coffee"
# @codekit-prepend "CoffeeScript.coffee"
# @codekit-prepend "XML.coffee"
# @codekit-prepend "JavaScript.coffee"
# @codekit-prepend "ES6.coffee"
# @codekit-prepend "Swift.coffee"
# @codekit-prepend "CSharp.coffee"
# @codekit-prepend "Diagram.coffee"
# @codekit-prepend "Library.coffee"
