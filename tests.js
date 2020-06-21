const meow = require('meow');
const colors = require('colors');
const getVersions = require('./_setup/getVersions.js');
const runTestsAndWait = require('./_setup/runTestsAndWait.js');

const cli = meow(`
	Run tests on all Laravel versions
	  $ node tests.js
    Run tests on given Laravel version
	  $ node tests.js {LaravelVersion}

	Examples
	  $ node tests.js
	  $ node tests.js "7.*"
`);

console.log(colors.green('Running tests for ' + cli.pkg.name));
if (cli.flags.verbose === false) {
    console.log(colors.gray('Want to see logs? Use --verbose'));
}
console.log(' ');

/**
 * Runs tests for all versions or for specified version
 */
(async () => {
    const currentDirectory = process.cwd()
    const versions = getVersions(cli.input)

    await runTestsAndWait(versions, currentDirectory, cli.flags.verbose)

    console.log(colors.green('🎉 All tests passed'));
})().catch(error => {
    console.log(colors.red('🙈 ' + error.message));
    process.exit(1)
});

