const meow = require('meow');
const colors = require('colors');
const getVersions = require('./_setup/getVersions.js');
const versionsRecursively = require('./_setup/versionsRecursively.js');
const program = require('./_setup/program');
const runTests = require('./_setup/runTests.js');
const table = require('markdown-table');

const cli = meow(`
	Run tests on all Laravel versions
	  $ node tests.js
    Run tests on given Laravel version
	  $ node tests.js {LaravelVersion}

	Options
	  --first        Test only on the first image for each Laravel version
	  --verbose, -v  Output test results

	Examples
	  $ node tests.js
	  $ node tests.js "7.*"
	  $ node tests.js "8.*" --first
`, {
    flags: {
        verbose: {
            type: 'boolean',
            alias: 'v'
        },
        first: {
            type: 'boolean'
        }
    }
});


/**
 * Runs tests for all versions or for specified version
 */
let tableContents = [
    ['Laravel version', 'Image version', 'Status'] // TODO rendeer the output per version in table
];
async function main () {
    const currentDirectory = process.cwd()
    let versions = getVersions(cli.input, { first: cli.flags.first })

    await versionsRecursively(versions, async function (version) {
        let success = false
        try {
            success = await runTests(version, currentDirectory, cli.flags.verbose);
        } catch (e) {
            success = false
            console.error(e)
        }
        tableContents.push([
            version.laravel,
            version.image_version,
            success ? '✅' : '🟥'
        ])
    }, cli.flags.verbose, true)

    console.log(colors.green('🎉 All tests passed'));
    console.log(table(tableContents));
}

program(process, cli, 'Running tests for', main)
