class Library
	constructor: (@el, @presenter) ->
		@collection = []
	
	add: (object) ->
		@collection.push object
		@changed()
	
	remove: (index) ->
		@collection.slice index, 1
		@changed()
	
	changed: () ->
		@render()
	
	render: () ->
		@el.innerHTML = ""
		for object in @collection
			@el.appendChild @renderSavedObject object
	
	renderSavedObject: (object) ->
		code = @presenter.renderInterface object
		saved = document.createElement "div"
		saved.classList.add "diagram-saved"
		saved.innerHTML = code
		saved
