class ObjectDescriptor {
	constructor(name) {
		this.name = name
		this.properties = []
		this.methods = []
		this.memberList = {}
	}
	
	addProperty(nameSpec) {
		const [ name, type ] = extractNameAndType(nameSpec)
		if (!this.memberList[`p$${name}`]) {
			this.properties.push({ name, type })
			this.memberList[`p$${name}`] = true
		}
	}
	
	removeProperty(name) {
		if (this.memberList[`p$${name}`]) {
			const newProps = this.properties.filter(entry => entry.name != name)
			if (newProps.length + 1 == this.properties.length) {
				this.properties = newProps
				this.memberList[`p$${name}`] = false
			}
		}
	}
	
	addMethod(name) {
		if (!this.memberList[`m$${name}`]) {
			this.methods.push({ name })
			this.memberList[`m$${name}`] = true
		}
	}
	
	removeMethod(name) {
		if (this.memberList[`m$${name}`]) {
			const newMeths = this.methods.filter(entry => entry.name != name)
			if (newMeths.length + 1 == this.methods.length) {
				this.methods = newMeths
				this.memberList[`m$${name}`] = false
			}
		}
	}
}

function extractNameAndType(naming) {
	const len = naming.length
	const typeTest = naming.split(":")
	let name = typeTest[0]
	let type = typeTest[1] || 'default'
	
	if (type == 'int') {
		type = 'integer'
	}
	
	if (naming.substr(naming.length - 1) == "?") {
		name = naming.substring(0, len - 1)
		type = 'boolean'
	}
	
	if (naming.match(/\[\]$/)) {
		name = naming.substring(0, len - 2)
		type = 'array'
	}
	
	if (naming.match(/\{\}$/)) {
		name = naming.substring(0, len - 2)
		type = 'dictionary'
	}
	
	return [ name, type ]
}

export default ObjectDescriptor
