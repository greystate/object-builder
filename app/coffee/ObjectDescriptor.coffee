class ObjectDescriptor
	memberList = {}
	constructor: (@name) ->
		@methods = []
		@properties = []
	
	addMethod: (name) ->
		if not memberList["m$#{name}"]
			@methods.push { name }
			memberList["m$#{name}"] = on
	
	addProperty: (name) ->
		if not memberList["p$#{name}"]
			@properties.push { name }
			memberList["p$#{name}"] = on