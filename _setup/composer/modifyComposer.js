const path = require('path');
const fs = require('fs');
const addRepository = require('./addRepository.js');

function modifyComposer (versionDir) {
    const composerFilePath = path.resolve(versionDir, 'composer.json');

    if (fs.existsSync(composerFilePath) === false) {
        throw new Error('Composer does not exists at ' + composerFilePath)
    }

    const composerJsonContents = fs.readFileSync(composerFilePath, 'utf8');
    const composerJson = JSON.parse(composerJsonContents);

    if (composerJson === null) {
        throw new Error('Invalid composer.json');
    }

    // Every Laravel will use local copy of the example using repository
    addRepository(composerJson, {
        type: 'path',
        url: '../example'
    })

    // Also we need to force local repository for our package that we are testing.
    addRepository(composerJson, {
        type: 'path',
        url: '../laravel-chunk-upload'
    })

    // Laravel < 5.5 does not allow dev-packages to be installed
    composerJson['minimum-stability'] = 'dev';
    composerJson['prefer-stable'] = true;

    const alteredComposerContents = JSON.stringify(composerJson, null, 2)
    fs.writeFileSync(composerFilePath, alteredComposerContents, 'utf8');
}

module.exports = modifyComposer
