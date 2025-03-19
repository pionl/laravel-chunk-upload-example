const meow = require('meow');
const colors = require('colors');
const getVersions = require('./_setup/getVersions.js');
const versionsRecursively = require('./_setup/versionsRecursively.js');
const program = require('./_setup/program');
const runTests = require('./_setup/runTests.js');

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
let table = [
    ['Laravel version', 'Image version', 'Status'] // TODO rendeer the output per version in table
];
async function main () {
    const currentDirectory = process.cwd()
    const versions = getVersions(cli.input)

    await versionsRecursively(versions, async function (version) {
        const success = await runTests(version, currentDirectory, cli.flags.verbose);

        if (success === false) {
            throw Error('Tests failed')
        }
    }, cli.flags.verbose)

    console.log(colors.green('🎉 All tests passed'));
}

program(process, cli, 'Running tests for', main)
