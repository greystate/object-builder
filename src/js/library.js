class Library {
	constructor(element, presenter) {
		this.el = element
		this.itemPresenter = presenter
		this.collection = []
	}
	
	add(object) {
		this.collection.push(object)
		this.changed()
	}
	
	get(index) {
		if(index >= 0 && index < this.collection.length) {
			return this.collection[index]
		}
	}
	
	remove(index) {
		this.collection.slice(index, 1)
		this.changed()
	}
	
	changed() {
		this.render()
	}
	
	render() {
		this.el.innerHTML = ""
		for(let index = 0, len = this.collection.length; index < len; index++) {
			this.el.appendChild(this.renderSavedObject(index))
		}
	}
	
	renderSavedObject(index) {
		const object = this.collection[index]
		const code = this.itemPresenter.renderInterface(object)
		let saved = document.createElement('div')
		saved.dataset.libraryIndex = index
		saved.classList.add('diagram-saved')
		saved.innerHTML = code
		return saved
	}
}

export default Library
