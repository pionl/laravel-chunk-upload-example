const run = require('./runCommand.js')
const path = require('path');
const fs = require('fs');
const colors = require('colors');
const deleteIfExists = require('./deleteIfExists.js');
const getLaravelsRoutesPath = require('./getLaravelsRoutesPath.js');
const modifyComposer = require('./composer/modifyComposer.js');
const addServiceProvider = require('./addServiceProvider.js');

/**
 * @param {Array} initGivenVersions
 * @param {string} currentDirectory
 * @param {boolean} verbose
 * @param {number} index
 */
async function setupRecursively (initGivenVersions, currentDirectory, verbose, index = 0) {
    if (typeof initGivenVersions[index] === 'undefined') {
        return true;
    }

    /** @type {{laravel: string, image_version: string}} */
    const version = initGivenVersions[index];
    const numericLaravelVersion = parseFloat(version.laravel.replace('.*', ''));
    const versionDir = path.resolve(currentDirectory, version.laravel);

    console.log(colors.green('🚀 Running setup ') + colors.gray(`${version.laravel}`));
    console.log('');

    // Update or install Laravel project
    if (fs.existsSync(versionDir)) {
        await run('composer', ['update'], versionDir, verbose);
    } else {
        const options = [
            'create-project',
            '--prefer-dist',
            `laravel/laravel`,
            version.laravel,
            version.laravel
        ];
        await run('composer', options, currentDirectory, verbose);
    }

    // Delete default routes path and create a an empty php file.
    const routesPath = getLaravelsRoutesPath(numericLaravelVersion, versionDir)

    await deleteIfExists(routesPath, currentDirectory);

    fs.writeFileSync(routesPath, '<?php\n', 'utf8');

    console.log(colors.green('⛑  Altering composer.json to support local example'))
    modifyComposer(versionDir)

    const requireExampleArgs = ['require', 'pion/laravel-chunk-example-app'];
    await run('composer', requireExampleArgs, versionDir, verbose)

    // For older Laravel versions without auto-discovery
    if (numericLaravelVersion < 5.5) {
        console.log(colors.green('⛑  Altering app config to use example service provider'))

        const exampleServiceProvider = 'Pion\\Laravel\\ChunkUploadExample\\ExampleServiceProvider::class';
        addServiceProvider(path.resolve(versionDir, 'config', 'app.php'), exampleServiceProvider);
    }

    const publishPackageArgs = ['artisan', 'vendor:publish', '--tag=public', '--force'];
    await run('php', publishPackageArgs, versionDir, verbose);

    return setupRecursively(initGivenVersions, currentDirectory, verbose, index + 1);
}

module.exports = setupRecursively
