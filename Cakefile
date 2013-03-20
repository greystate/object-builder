{exec} = require 'child_process'

# Options
option '-f', '--file [FILE_BASENAME]', 'compile a specific file (assumes .eco extension)'

# Build docco docs for the coffee files
task 'doc:build', 'build docs for coffee files', () ->
	exec "docco app/coffee/*.coffee", (err, stdout, stderr) ->
		throw err if err
		console.log stdout + stdout

# Compile .eco templates
task 'eco:compile', 'compile eco templates', (options) ->
	options.file or= '*'
	exec "eco app/views/templates/#{options.file}.eco", (err, stdout, stderr) ->
		throw err if err
		console.log stdout + stderr

