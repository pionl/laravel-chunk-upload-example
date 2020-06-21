const run = require('./runCommand.js');

/**
 * @param {string} versionDir
 * @param {boolean} verbose
 * @return {Promise<void>}
 */
async function publish (versionDir, verbose) {
    const publishPackageArgs = ['artisan', 'vendor:publish', '--tag=public', '--force'];
    await run('php', publishPackageArgs, versionDir, verbose);
}

module.exports = publish
