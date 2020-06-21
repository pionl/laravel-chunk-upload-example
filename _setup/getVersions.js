/** @type {Array} */
const versions = require('../versions.json');
const getPreferredVersion = require('./getPreferredVersion.js');

function getVersions (userInput) {
    // Track which versions should we init? All or given (in argument)
    const useOnlyGivenVersion = getPreferredVersion(userInput)
    const useGivenVersions = []
    let noVersions = true
    versions.forEach(version => {
        if (useOnlyGivenVersion === null || version.laravel === useOnlyGivenVersion) {
            noVersions = false

            useGivenVersions.push(version)
        }
    })

    if (noVersions) {
        throw new Error('✋ Given versions does not exists')
    }

    return useGivenVersions
}

module.exports = getVersions
