class ObjectDescriptor {
	constructor(name) {
		this.name = name
		this.properties = []
		this.methods = []
		this.memberList = []
	}
	
	addProperty(nameSpec) {
		const [ name, type ] = extractNameAndType(nameSpec)
		if (!this.memberList.includes(`p$${name}`)) {
			this.properties.push({ name, type })
			this.memberList[`p$${name}`] = true
		}
	}
	
	addMethod(name) {
		if (!this.memberList.includes(`m$${name}`)) {
			this.methods.push({ name })
			this.memberList[`m$${name}`] = true
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
