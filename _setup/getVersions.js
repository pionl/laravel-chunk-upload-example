/** @type {Array} */
const versions = require('../versions.json');
const getPreferredVersion = require('./getPreferredVersion.js');

/**
 *
 * @param {string} userInput
 * @param {{first: boolean|undefined, unique: boolean|undefined}} options Return only first version, unique: return uniuqe laravel version
 * @returns {*|*[]}
 */
function getVersions (userInput, options = {}) {
    // Track which versions we should init? All or given (in argument)
    const useOnlyGivenVersion = getPreferredVersion(userInput);
    const useGivenVersions = [];
    let noVersions = true;
    let laravelVersion = {}

    versions.forEach(version => {
        const preferredVersion = version.laravel === useOnlyGivenVersion;

        if (useOnlyGivenVersion === null || preferredVersion) {
            noVersions = false;

            // Ignore pre-release while using all versions
            if (preferredVersion === false && version.pre_release === true) {
                return true;
            }

            if (options.unique && laravelVersion[version.laravel] === true) {
                return true;
            }

            laravelVersion[version.laravel] = true

            useGivenVersions.push(version);
        }
    })

    if (noVersions) {
        throw new Error('✋ Given version does not exists: ' + useOnlyGivenVersion);
    }

    const sorted = useGivenVersions.reverse();

    // The goal is to find first usable laravel version
    if (!options.first) {
        return sorted;
    }

    return sorted.slice(0, 1);
}

module.exports = getVersions
