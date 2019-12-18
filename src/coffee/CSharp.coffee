class CSharp extends Language
	constructor: () ->
		super "C#",
			template: 'csharp'
			prism: 'javascript'
			types:
				default: 'string'
				boolean: 'bool'
				string: 'string'
				integer: 'int'
				double: 'double'
				array: 'string[]'
				dictionary: 'Dictionary<string, string>'

new CSharp
