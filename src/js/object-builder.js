import { domSelect as $, domSelectAll as $$, getSelectedRadioValue as $val } from '../lib/helpers/helpers'
import Library from './library'
import ObjectDescriptor from './object-descriptor'

import Swift from './languages/swift'
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
		this.addLanguage(Swift)
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
}

window.app = window.app || { }
window.app.controller = new ObjectBuilderController()
