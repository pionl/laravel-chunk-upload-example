/**
 *
 * @param {Array} versions
 * @param {Promise|function} onVersion
 * @param {int} versionIndex
 * @return {Promise<undefined|*>}
 */
async function versionsRecursively (versions, onVersion, versionIndex = 0) {
    if (typeof versions[versionIndex] === 'undefined') {
        return;
    }

    const version = versions[versionIndex];


    await onVersion(version)


    return versionsRecursively(versions, onVersion, versionIndex + 1)
}

module.exports = versionsRecursively
