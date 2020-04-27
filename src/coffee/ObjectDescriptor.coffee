class ObjectDescriptor
	constructor: (@name) ->
		@memberList = {}
		@methods = []
		@properties = []
	
	addMethod: (name) ->
		if not @memberList["m$#{name}"]
			@methods.push { name }
			@memberList["m$#{name}"] = on
	
	addProperty: (nameSpec) ->
		{ name, type } = extractNameAndType nameSpec
		if not @memberList["p$#{name}"]
			@properties.push { name, type }
			@memberList["p$#{name}"] = on
	
	removeProperty: (name) ->
		if @memberList["p$#{name}"]
			newProps = @properties.filter (entry) => entry.name isnt name
			if newProps.length + 1 is @properties.length
				@properties = newProps
				@memberList["p$#{name}"] = off
	
	removeMethod: (name) ->
		if @memberList["m$#{name}"]
			newMeths = @methods.filter (entry) => entry.name isnt name
			if newMeths.length + 1 is @methods.length
				@methods = newMeths
				@memberList["m$#{name}"] = off
	
	clone: ->
		cloned = new ObjectDescriptor @name
		cloned.addMethod meth.name for meth in @methods
		cloned.addProperty "#{prop.name}:#{prop.type}" for prop in @properties
		cloned
	
	serialize: ->
		props = (serializeMember prop for prop in @properties)
		meths = (meth.name for meth in @methods)
		"#{@name}__#{props.join '--'}__#{meths.join '--'}"

	# Return a condensed string for the 
	
	serializeMember = (member) ->
		name = member.name
		type = switch member.type
			when 'integer' then ':int'
			when 'double' then ':dbl'
			when 'array' then '[]'
			when 'dictionary' then '{}'
			when 'boolean' then '?'
			else ''
		
		"#{name}#{type}"
	
	# Parse the name of a property to get its name (and optionally its type too)
	#
	#		name          # => default
	#		name?         # => boolean
	#		name[]        # => array
	#		name{}        # => dictionary
	#		name:int      # => integer
	#		name:integer  # => integer
	#		name:dbl      # => double
	#		name:double   # => double
	
	extractNameAndType = (naming) ->
		len = naming.length
		typeTest = naming.split ":"
		name = typeTest[0]
		type = typeTest[1] ? 'default'
		
		if type is 'int' then type = 'integer'
		if type is 'dbl' then type = 'double'
		
		if naming.substr(naming.length - 1) is "?"
			name = naming.substring 0, len - 1
			type = 'boolean'
		
		if naming.match /\[\]$/
			name = naming.substring 0, len - 2
			type = 'array'
		
		if naming.match /\{\}$/
			name = naming.substring 0, len - 2
			type = 'dictionary'
		
		{ name, type }
		
