const os = require('os')

function chunk (array, size) {
    const chunkedArray = []
    for (var i = 0; i < array.length; i += size) {
        chunkedArray.push(array.slice(i, i + size))
    }
    return chunkedArray
}

/**
 *
 * @param {Array} versions
 * @param {Promise|function} onVersion
 * @param {int} versionIndex
 * @return {Promise<undefined|*>}
 */
async function runRecursively (versions, onVersion, versionIndex = 0) {
    if (typeof versions[versionIndex] === 'undefined') {
        return;
    }

    const version = versions[versionIndex];

    await onVersion(version)

    return versionsRecursively(versions, onVersion, versionIndex + 1)
}

/**
 *
 * @param {Array} versions
 * @param {Promise|function} onVersion
 * @param {boolean} isVerbose
 * @return {Promise<undefined|*}
 */
async function versionsRecursively (versions, onVersion, isVerbose) {
    if (isVerbose) {
        return await runRecursively(versions, onVersion)
    }
    let tasks = []

    // Limit to X tasks at once to prevent over spamming github
    const chunks = chunk(versions, Math.min(4, Math.ceil(os.cpus().length / 2)))
    for (let i = 0; i < chunks.length; i++) {
        const innerTasks = []
        chunks[i].forEach(function (version) {
            innerTasks.push(onVersion(version))
        })

        await Promise.all(innerTasks)
    }

}


module.exports = versionsRecursively
