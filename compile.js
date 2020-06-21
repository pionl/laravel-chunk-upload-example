const meow = require('meow');
const path = require('path');
const colors = require('colors');
const getVersions = require('./_setup/getVersions.js');
const program = require('./_setup/program');
const publish = require('./_setup/publish');
const compileExample = require('./_setup/compileExample.js');
const versionsRecursively = require('./_setup/versionsRecursively.js');

const cli = meow(`
	Compiles example and publishes changes on all versions
	  $ node compile.js
    Compiles example and publishes changes to given version
	  $ node compile.js {LaravelVersion}

	Examples
	  $ node compile.js
	  $ node compile.js "7.*"
`, {
    flags: {
        verbose: {
            type: 'boolean',
            alias: 'v'
        }
    }
});

async function main () {
    const currentDirectory = process.cwd();

    console.log(colors.green('🚀 Compiling example'));
    const exampleDirectory = path.resolve(currentDirectory, 'example');
    await compileExample(exampleDirectory, cli.flags.verbose)

    const useGivenVersions = getVersions(cli.input);
    await versionsRecursively(useGivenVersions, async function (version) {
        console.log(colors.green('🚀 Publishing changes ') + colors.gray(version.laravel));
        const versionDir = path.resolve(currentDirectory, version.laravel);

        await publish(versionDir, cli.flags.verbose);
    })
}

program(process, cli, 'Compiling for', main)
