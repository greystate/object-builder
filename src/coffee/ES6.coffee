class ES6 extends Language
	constructor: () ->
		super "ES6",
			prism: "javascript"
			types:
				default: '""'
				boolean: 'null'
				string: '""'
				integer: '0'
				double: '0.0'
				array: '[ ]'
				dictionary: '{ }'

new ES6
