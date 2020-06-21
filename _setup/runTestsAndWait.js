const runTests = require('./runTests.js');

/**
 * @param {Array} versions
 * @param {string} currentDirectory
 * @param {boolean} verbose
 * @param {number} versionIndex
 * @return {Promise<void>}
 */
async function runTestsAndWait (versions, currentDirectory, verbose, versionIndex = 0) {
    if (typeof versions[versionIndex] === 'undefined') {
        return;
    }

    const version = versions[versionIndex];
    const success = await runTests(version, currentDirectory, verbose);

    if (success === false) {
        throw Error('Tests failed')
    }

    await runTestsAndWait(versions, currentDirectory, verbose, versionIndex + 1)
}

module.exports = runTestsAndWait
