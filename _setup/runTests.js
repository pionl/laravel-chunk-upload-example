const run = require('./runCommand.js');
const colors = require('colors');
const path = require('path');

/**
 * Returns true if the test was successful.
 *
 * @param version
 * @param currentDirectory
 * @param {boolean} verbose
 * @return {Promise<boolean>}
 */
async function runTests (version, currentDirectory, verbose) {
    const dockerComposeArgs = [
        '-f',
        'docker-compose.yml',
        '-f',
        'docker-compose-tests.yml',
        'up',
        '--abort-on-container-exit'
    ];
    const environmentVars = {
        IMAGE_VERSION: version.image_version,
        LARAVEL_VERSION: version.laravel,
    };

    try {
        const versionMessage = colors.green(`🚀 Running tests for ${version.laravel}`)
        const imageVersionMessage = colors.gray(`image version: ${version.image_version}`)
        console.log(`${versionMessage} ${imageVersionMessage}`)

        const result = await run(
            'docker-compose', dockerComposeArgs, currentDirectory, verbose, environmentVars
        );
        return result.exitCode !== 0
    } catch (error) {
        // OSX - segmentation fault bud tests are ok
        // Determine folder that docker-compose uses
        const folder = path.relative(path.dirname(currentDirectory), currentDirectory)
        if (typeof error.stdout === 'string'
            && error.stdout.indexOf(folder + '_codeceptjs_1 exited with code 0') !== -1) {
            console.log(' ')
            return true;
        }

        const message = error.shortMessage || error.message;
        console.log(colors.red('🙈 ' + message));
        return false;
    }
}

module.exports = runTests
