import Language from './language'

class Swift extends Language {
	constructor() {
		super('Swift', {
			types: {
				default: 'String',
				boolean: 'Bool',
				string: 'String',
				integer: 'Int',
				double: 'Double',
				array: '[ String ]',
				dictionary: '[ String: String ]'
			}
		})
	}
}

export default Swift
