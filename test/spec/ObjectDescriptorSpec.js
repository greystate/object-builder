describe("ObjectDescriptor", () => {
	beforeEach(() => {
		this.od = new ObjectDescriptor()
		
		this.point = new ObjectDescriptor("Point")
		this.point.addProperty("x")
		this.point.addProperty("y")
		this.point.addMethod("draw")
		this.point.addMethod("toString")
	})
	
	it("has a name", () => {
		expect(new ObjectDescriptor("Ufo").name).toEqual("Ufo")
	})
	
	describe("addMethod", () => {
		it("adds a method to the ObjectDescriptor", () => {
			this.od.addMethod("toString")
			expect(this.od.methods.length).toEqual(1)
			expect(this.od.methods[0].name).toEqual("toString")
		})
	})
	
	describe("addProperty", () => {
		it("adds a property to the ObjectDescriptor", () => {
			this.od.addProperty("length")
			expect(this.od.properties.length).toEqual(1)
			expect(this.od.properties[0].name).toEqual("length")
		})
		
		it("sets the type to 'default' if none specified", () => {
			this.od.addProperty("isDefault")
			expect(this.od.properties[0].type).toEqual("default")
		})
		
		it("extracts the type when specified", () => {
			this.od.addProperty("isBoolean?")
			this.od.addProperty("isArray[]")
			this.od.addProperty("isDictionary{}")
			this.od.addProperty("isInt:int")
			this.od.addProperty("isDouble:dbl")
			expect(this.od.properties[0].type).toEqual("boolean")
			expect(this.od.properties[1].type).toEqual("array")
			expect(this.od.properties[2].type).toEqual("dictionary")
			expect(this.od.properties[3].type).toEqual("integer")
			expect(this.od.properties[4].type).toEqual("double")
		})
	})
	
	describe("removeProperty", () => {
		it("removes the property from the object", () => {
			this.point.removeProperty("x")
			expect(this.point.properties.length).toEqual(1)
			expect(this.point.memberList["p$x"]).toBe(false)
		})
	})
	
	describe("removeMethod", () => {
		it("removes the method from the object", () => {
			this.point.removeMethod("toString")
			expect(this.point.methods.length).toEqual(1)
			expect(this.point.memberList["m$toString"]).toBe(false)
		})
	})
	
	describe("serialize", () => {
		it("serializes a blank ObjectDescriptor", () => {
			expect(this.od.serialize()).toEqual("undefined____")
		})
		
		it("serializes an ObjectDescriptor only a name", () => {
			const p = new ObjectDescriptor("Name")
			expect(p.serialize()).toEqual("Name____")
		})
		
		it("serializes an ObjectDescriptor with no methods", () => {
			this.point.removeMethod("draw")
			this.point.removeMethod("toString")
			expect(this.point.serialize()).toEqual("Point__x--y__")
		})
		
		it("serializes an ObjectDescriptor with no properties", () => {
			this.point.removeProperty("x")
			this.point.removeProperty("y")
			expect(this.point.serialize()).toEqual("Point____draw--toString")
		})
		
		it("serializes an ObjectDescriptor with properties and methods", () => {
			expect(this.point.serialize()).toEqual("Point__x--y__draw--toString")
		})
		
		it("maintains type information for typed properties", () => {
			const vector = new ObjectDescriptor("Vector")
			vector.addProperty("upwards?")
			vector.addProperty("x:int")
			vector.addProperty("y:integer")
			vector.addProperty("product:double")
			vector.addProperty("versions[]")
			vector.addProperty("keys{}")
			expect(vector.serialize()).toEqual("Vector__upwards?--x:int--y:int--product:dbl--versions[]--keys{}__")
		})
	})
})
