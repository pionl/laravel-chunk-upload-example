const meow = require('meow');
const colors = require('colors');
const getVersions = require('./_setup/getVersions.js');
const runTestsAndWait = require('./_setup/runTestsAndWait.js');
const program = require('./_setup/program')

const cli = meow(`
	Run tests on all Laravel versions
	  $ node tests.js
    Run tests on given Laravel version
	  $ node tests.js {LaravelVersion}

	Examples
	  $ node tests.js
	  $ node tests.js "7.*"
`, {
    flags: {
        verbose: {
            type: 'boolean',
            alias: 'v'
        }
    }
});

/**
 * Runs tests for all versions or for specified version
 */
program(
    process,
    cli,
    'Running tests for',
    async function () {
        const currentDirectory = process.cwd()
        const versions = getVersions(cli.input)

        await runTestsAndWait(versions, currentDirectory, cli.flags.verbose)

        console.log(colors.green('🎉 All tests passed'));
    }
)
