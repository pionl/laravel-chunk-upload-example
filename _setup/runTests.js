const run = require('./runCommand.js');
const colors = require('colors');

function cleanString (string) {
    const replace = ['.', '*']
    replace.forEach(function (char) {
        string = string.replace(char, '')
    })
    return string
}

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
        'compose',
        `-p=chunk-laravel-${cleanString(version.image_version)}-${cleanString(version.laravel)}`,
        '-f',
        'docker-compose.yml',
        '-f',
        'docker-compose-tests.yml',
        'up',
        '--abort-on-container-exit',
        '--build'
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
            'docker', dockerComposeArgs, currentDirectory, verbose, environmentVars
        );

        return result.exitCode === 0
    } catch (error) {
        const message = error.shortMessage || error.message;
        console.log(colors.red('🙈 ' + message));
        console.log(error.stdout)
        return false;
    }
}

module.exports = runTests
