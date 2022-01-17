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
		
		this.library = new Library($('.library'), this.languages.Diagram)
		this.addLanguagesToForm()
		this.assignHandlers()
		this.setFocusAndPickDefaultLanguage()
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
			if (name != 'Diagram') {
				language = this.languages[name]
				radios.push(`<p class="radiofield"><input type="radio" value="${name}" name="codelang" id="codelang-${++index}"><label for="codelang-${index}">${name}</label></p>`)
			}
		}
		$('.language').innerHTML += radios.join('\n')
	}
	
	assignHandlers() {
		// Assign change events
		$('#name').addEventListener('change', this.setObjectName.bind(this), false)
		$('#property').addEventListener('change', this.addProperty.bind(this), false)
		$('#method').addEventListener('change', this.addMethod.bind(this), false)
		
		const radios = $('[name="codelang"]')
		radios.forEach(radio => {
			radio.addEventListener('change', () => this.changed(), false)
		})
		
		$(".library").addEventListener('click', this.libraryClickHandler, false)
		
		// Assign keypress
		$('#name').addEventListener('keypress', this.handleKeypress, false)
		$('#property').addEventListener('keypress', this.handleKeypress, false)
		$('#method').addEventListener('keypress', this.handleKeypress, false)
		
		// Hook up the Save button
		$('#save').addEventListener('click', this.saveCurrentObjectToLibrary.bind(this), false)
		
		// Hook up a future "Remove" button
		$('.diagram').addEventListener('click', this.diagramClickHandler.bind(this), false)
		
		// Light validation warning
		const textfields = $('input[type="text"]')
		textfields.forEach(textfield => {
			textfield.addEventListener('keyup', this.validityChecker, false)
		})
	}
	
	setObjectName(event) {
		const val = event.target.value
		if (val == 'tester') {
			return this.testObject()
		}
		this.currentObject.name = val
		this.changed()
	}
	
	addProperty(event) {
		const val = event.target.value
		this.currentObject.addProperty(val)
		this.changed()
	}
	
	addMethod(event) {
		const val = event.target.value
		this.currentObject.addMethod(val)
		this.changed()
	}
	
	removeProperty(name) {
		this.currentObject.removeProperty(name)
		this.changed()
	}
		
	removeMethod(name) {
		this.currentObject.removeMethod(name)
		this.changed()
	}
		
	reset() {
		this.currentObject = new ObjectDescriptor()
		this.changed()
		this.resetForm()
	}
	
	resetForm() {
		$('#name').value = ''
		$('#property').value = ''
		$('#method').value = ''
		$('#name').focus()
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
	
	saveCurrentObjectToLibrary(event) {
		event.preventDefault()
		this.library.add(this.currentObject.clone())
		this.reset()
	}
	
	validityChecker(event) {
		const field = event.target
		if (field.value.length == 0) {
			field.classList.remove('invalid')
		} else {
			const ok = validRE.test(field.value)
			field.classList.toggle('invalid', !ok)
		}
	}
	
	diagramClickHandler(event) {
		const target = event.target.closest('td')
		let ref
		if (target && target.dataset) {
			const propName = (ref = target.dataset.propname) != null ? ref : null
			const methName = (ref = target.dataset.methname) != null ? ref : null
			if (propName) {
				this.removeProperty(propName)
			} else if (methName) {
				this.removeMethod(methName)
			}
		}
	}
	
	addControls() {
		const memberRows = $$('.diagram td[data-propname], .diagram td[data-methname]')
		memberRows.forEach(mem => {
			let button = document.createElement('button')
			button.type = 'button'
			button.textContent = 'Remove'
			mem.appendChild(button)
		})
	}
	
	handleKeypress(event) {
		const input = event.target
		const code = event.keyCode
	
		if (code == RETURN_KEY) {
			if (input.id == 'name') {
				$('#property').select()
			} else {
				input.select()
			}
		}
	}
	
	setFocusAndPickDefaultLanguage() {
		$('#codelang-1').checked = true
		$('#name').focus()
		$('#name').select()
		this.changed()
	}
}

window.app = window.app || { }
window.app.controller = new ObjectBuilderController()
