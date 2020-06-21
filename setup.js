#!/usr/bin/env node

const meow = require('meow');
const colors = require('colors');
const path = require('path');
const run = require('./_setup/runCommand.js')
const setupRecursively = require('./_setup/setupRecursively.js');
const getVersions = require('./_setup/getVersions.js');
const program = require('./_setup/program.js');

const cli = meow(`
	Install all Laravel versions
	  $ node setup.js
    Install given Laravel version
	  $ node setup.js {LaravelVersion}

	Options
	  --verbose, -v  Output composer / npm output
	  --ignore-example, -ix  Do not update and build the example repo

	Examples
	  $ node setup.js
	  $ node setup.js "7.*"
`, {
    flags: {
        verbose: {
            type: 'boolean',
            alias: 'v'
        },
        ignoreExample: {
            type: 'boolean',
            alias: 'ix'
        }
    }
});

program(
    process,
    cli,
    'Preparing',
    async function () {
        const currentDirectory = process.cwd();
        const exampleDirectory = path.resolve(currentDirectory, 'example');

        if (cli.flags.ignoreExample === false) {
            // Update the example
            console.log(colors.green('🚀 Preparing example'))
            console.log(' ')

            await run('composer', ['update'], exampleDirectory, cli.flags.verbose)
            await run('npm', ['install'], exampleDirectory, cli.flags.verbose)
            await run('npm', ['run', 'dev'], exampleDirectory, cli.flags.verbose)
        }

        const useGivenVersions = getVersions(cli.input)

        await setupRecursively(useGivenVersions, currentDirectory, cli.flags.verbose, 0)
    }
)
