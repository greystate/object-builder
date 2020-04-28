TIE = '|-o-|'
LIB_KEY = 'library'
EMPTY = ''

class Library
	constructor: (@el, @itemPresenter, @storage) ->
		@collection = []
		@loadFromStorage()
	
	add: (object) ->
		@collection.push object
		@changed()
	
	get: (index) ->
		if 0 <= index < @collection.length
			@collection[index]
	
	remove: (index) ->
		@collection.slice index, 1
		@changed()
	
	changed: () ->
		@render()
		@persist()
	
	render: () ->
		@el.innerHTML = ""
		for index in [0...@collection.length]
			@el.appendChild @renderSavedObject index
	
	renderSavedObject: (index) ->
		object = @collection[index]
		code = @itemPresenter.renderInterface object
		saved = document.createElement "div"
		saved.dataset.libraryIndex = index
		saved.classList.add "diagram-saved"
		saved.innerHTML = code
		saved
	
	persist: () ->
		if @collection.length isnt 0
			@storage.setItem LIB_KEY, @serialize()
	
	loadFromStorage: () ->
		objects = @storage.getItem LIB_KEY
		if objects? and objects isnt EMPTY
			for obj in objects.split TIE
				@collection.push ObjectDescriptor.deserialize obj
			@changed()
	
	clear: () ->
		@collection = []
		@changed()
	
	serialize: () ->
		objects = (obj.serialize() for obj in @collection)
		objects.join TIE
	