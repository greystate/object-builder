// Language
// The `Language` class is the base for languages we're hoping to support,
// so that every new language supports the basic operations, `renderInterface()`
// being the prime contender at the moment.
// 
//  `template` is the name of the eco template for rendering the language
//  `prism` is the name of the [Prism](http://prismjs.com) language to use for syntax highlighting.

class Language {
	constructor(name, options = {}) {
		let ref
		this.name = name
		this.template = options.template || this.name.toLowerCase()
		this.prism = options.prism || this.name.toLowerCase()
		this.types = (ref = options.types) != null ? ref : { default: 'string' }
	}

	renderInterface(object) {
		let ref
		object.nameForType = (type) => (ref = this.types[type]) != null ? ref : 'N/A'
		return window.ecoTemplates[this.template](object)
	}
}

export default Language
