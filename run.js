#!/usr/bin/env node

const meow = require('meow');
const colors = require('colors');
const path = require('path');
const run = require('./_setup/runCommand.js');
const setupVersion = require('./_setup/setupVersion.js');
const versionsRecursively = require('./_setup/versionsRecursively.js');
const getVersions = require('./_setup/getVersions.js');
const program = require('./_setup/program.js');
const compileExample = require('./_setup/compileExample');

const cli = meow(`
    Run given Laravel version
	  $ node run.js {LaravelVersion}

	Options
	  --verbose, -v  Output composer / npm output
	  --ignore-example, -ix  Do not update and build the example repo

	Examples
	  $ node run.js "7.*"
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

    const useGivenVersions = getVersions(cli.input);

    if (useGivenVersions === null) {
        throw new Error('You need to provide a version')
    }

    await versionsRecursively(useGivenVersions, async function (version) {

        await run('docker', ['compose', 'up', '--build'], currentDirectory, cli.flags.verbose, {
            IMAGE_VERSION: version.image_version,
            LARAVEL_VERSION: version.laravel,
        } );
    });
}

program(process, cli, 'Preparing', main)
