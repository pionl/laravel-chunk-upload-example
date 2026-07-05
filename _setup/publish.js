const run = require('./runCommand.js');

/**
 * @param {string} versionDir
 * @param {boolean} verbose
 * @return {Promise<void>}
 */
async function publish (versionDir, verbose) {
    await run('php', ['artisan', 'vendor:publish', '--tag=public', '--force'], versionDir, verbose);
    await run('php', ['artisan', 'vendor:publish', '--provider=Pion\\Laravel\\ChunkUpload\\Providers\\ChunkUploadServiceProvider', '--force'], versionDir, verbose);
}

module.exports = publish
