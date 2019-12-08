class Library
	constructor: (@el, @itemPresenter) ->
		@collection = []
	
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
