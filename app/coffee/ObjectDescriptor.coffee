class ObjectDescriptor
	memberList = {}
	constructor: (@name) ->
		@methods = []
		@properties = []
	
	addMethod: (name) ->
		if not memberList["m$#{name}"]
			@methods.push { name }
			memberList["m$#{name}"] = on
	
	addProperty: (naming) ->
		typeTest = naming.split ":"
		name = typeTest[0]
		type = typeTest[1] ? 'default'
		if naming.match /\[\]$/
			name = naming.substring 0, naming.length - 2
			type = 'array'
		
		if not memberList["p$#{name}"]
			@properties.push { name, type }
			memberList["p$#{name}"] = on
