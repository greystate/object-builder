import { domSelect as $, domSelectAll as $$, getSelectedRadioValue as $val } from '../lib/helpers/helpers'
import Library from './library'
import ObjectDescriptor from './object-descriptor'

import Diagram from './languages/diagram'
import CoffeeScript from './languages/coffee-script'
import CSharp from './languages/csharp'
import Swift from './languages/swift'
import XML from './languages/xml'
import ES6 from './languages/es6'

const RETURN_KEY = 13
const validRE = /^[^\s,\.()-]+$/

class ObjectBuilderController {
	constructor() {
		this.app = window.app || { }
		this.currentObject = new ObjectDescriptor()
		this.setupLanguages()
		
		this.library = new Library($('.library'), this.languages)
		this.addLanguagesToForm()
		// this.assignHandlers()
		// this.setFocusAndPickDefaultLanguage()
		
	}
	
	setupLanguages() {
		this.languages = {}
		this.addLanguage(Diagram)
		this.addLanguage(CoffeeScript)
		this.addLanguage(CSharp)
		this.addLanguage(Swift)
		this.addLanguage(XML)
		this.addLanguage(ES6)
	}
	
	addLanguage(language) {
		const lang = new language()
		this.languages[lang.name] = lang
	}
	
	addLanguagesToForm() {
		let index = 0
		let radios = []
		let language
		for (let name in this.languages) {
			if (name != "Diagram") {
				language = this.languages[name]
				radios.push(`<p class="radiofield"><input type="radio" value="${name}" name="codelang" id="codelang-${++index}"><label for="codelang-${index}">${name}</label></p>`)
			}
		}
		$('.language').innerHTML += radios.join('\n')
	}
	
	testObject() {
		this.currentObject = new ObjectDescriptor('ObjectDescriptor')
		
		this.currentObject.addMethod('addMethod')
		this.currentObject.addMethod('addProperty')
		this.currentObject.addMethod('clone')
		
		this.currentObject.addProperty('memberlist{}')
		this.currentObject.addProperty('methods[]')
		this.currentObject.addProperty('properties[]')
		this.changed()
	}
	
	changed() {
		const lang = $val('codelang')
		this.renderObject(this.currentObject)
		if (typeof lang !== 'undefined' && lang !== null) {
			this.renderCode(this.currentObject, lang)
			Prism.highlightAll()
		}
	}
	
	renderCode(object, language) {
		const presenter = this.languages[language]
		const rendered = presenter.renderInterface(object)
		
		let codeWindow = $('.output code')
		codeWindow.textContent = rendered
		codeWindow.className = `language-${presenter.prism}`
	}
	
	renderObject(object) {
		const presenter = this.languages.Diagram
		const code = presenter.renderInterface(object)
		
		let diagramWindow = $('.diagram')
		diagramWindow.innerHTML = code
		this.addControls()
	}
	
	addControls() { }
}

window.app = window.app || { }
window.app.controller = new ObjectBuilderController()
