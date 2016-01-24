class XML extends Language
	constructor: () ->
		super "XML",
			prism: "markup"
			types:
				default: 'string'
				boolean: 'boolean'
				string: 'string'
				integer: 'integer'
				double: 'double'
				array: 'array'
				dictionary: 'dictionary'

new XML