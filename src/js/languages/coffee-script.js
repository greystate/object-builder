import Language from './language'

class CoffeeScript extends Language {
	constructor() {
		super('CoffeeScript', {
			template: 'coffee'
		})
	}
}

export default CoffeeScript
