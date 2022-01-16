// Language
// The `Language` class is the base for languages we're hoping to support,
// so that every new language supports the basic operations, `renderInterface()`
// being the prime contender at the moment.
// 
//  `template` is the name of the eco template for rendering the language
//  `prism` is the name of the [Prism](http://prismjs.com) language to use for syntax highlighting.
class Language {
	constructor(name, options = {}) {
		this.name = name
		this.template = options.template || this.name.toLowerCase()
		this.prism = options.prism || this.name.toLowerCase()
		this.types = options.types || { 'default': 'string' }
	}

	renderInterface(object) {
		object.nameForType = function(type) { return this.types[type] || 'N/A' }
		ecoTemplates[this.template](object)
	}
}

export default Language
