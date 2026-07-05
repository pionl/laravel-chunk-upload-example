const colors = require('colors');
const {runComposeCommand} = require('./runComposeCommand.js');

/**
 * Returns true if the test was successful.
 *
 * @param version
 * @param currentDirectory
 * @param {boolean} verbose
 * @return {Promise<boolean>}
 */
async function runTests (version, currentDirectory, verbose) {
    try {
        const versionMessage = colors.green(`🚀 Running tests for ${version.laravel}`)
        const imageVersionMessage = colors.gray(`image version: ${version.image_version}`)
        console.log(`${versionMessage} ${imageVersionMessage}`)

        const result = await runComposeCommand(version, currentDirectory, verbose, {
            files: ['docker-compose.yml', 'docker-compose-tests.yml'],
            upArgs: ['--abort-on-container-exit', '--build'],
            cleanup: true
        });

        return result.exitCode === 0
    } catch (error) {
        const message = error.shortMessage || error.message;
        console.log(colors.red('🙈 ' + message));
        console.log(error.stdout)
        return false;
    }
}

module.exports = runTests
