class JavaScript extends Language
	constructor: () ->
		super "JavaScript",
			types:
				default: '""'
				boolean: 'null'
				string: '""'
				integer: '0'
				double: '0.0'
				array: '[ ]'
				dictionary: '{ }'

new JavaScript