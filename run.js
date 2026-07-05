#!/usr/bin/env node

const meow = require('meow');
const colors = require('colors');
const {runComposeCommand} = require('./_setup/runComposeCommand.js');
const versionsRecursively = require('./_setup/versionsRecursively.js');
const getVersions = require('./_setup/getVersions.js');
const program = require('./_setup/program.js');
const waitForHttpReady = require('./_setup/waitForHttpReady.js');

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

    const useGivenVersions = getVersions(cli.input, {first: true, unique: true});

    if (useGivenVersions === null) {
        throw new Error('You need to provide a version')
    }

    await versionsRecursively(useGivenVersions, async function (version) {
        console.log('Starting example project for Laravel ', version.laravel, 'will output url when ready')
        await runComposeCommand(version, currentDirectory, cli.flags.verbose, {
            upArgs: ['--build'],
            readinessCheck: async function ({signal}) {
                const url = 'http://127.0.0.1:8000';

                await waitForHttpReady(url, {signal});
                console.log(colors.green(`✅ Laravel is ready at ${url}`));
            }
        });
    }, cli.flags.verbose, false);
}

program(process, cli, 'Preparing', main)
