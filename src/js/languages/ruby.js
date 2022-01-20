import Language from './language'

class Ruby extends Language {
	constructor() {
		super('Ruby', {
			prism: 'ruby',
			types: {
				default: '""',
				boolean: 'false',
				string: '""',
				integer: '0',
				double: '0.0',
				array: '[ ]',
				dictionary: '{ }'
			}
		})
	}
}

export default Ruby
