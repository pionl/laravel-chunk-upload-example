/** @type {Array} */
const versions = require('../versions.json');
const getPreferredVersion = require('./getPreferredVersion.js');

function getVersions (userInput) {
    // Track which versions should we init? All or given (in argument)
    const useOnlyGivenVersion = getPreferredVersion(userInput);
    const useGivenVersions = [];
    let noVersions = true;

    versions.forEach(version => {
        const preferredVersion = version.laravel === useOnlyGivenVersion;

        if (useOnlyGivenVersion === null || preferredVersion) {
            noVersions = false;

            // Ignore pre-release while using all versions
            if (preferredVersion === false && version.pre_release === true) {
                return true;
            }

            useGivenVersions.push(version);
        }
    })

    if (noVersions) {
        throw new Error('✋ Given version does not exists: ' + useOnlyGivenVersion);
    }

    return useGivenVersions.reverse();
}

module.exports = getVersions
