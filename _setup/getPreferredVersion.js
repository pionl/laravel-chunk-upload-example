/**
 * @param {Array} userInput
 */
function getPreferredVersion (userInput) {
    if (userInput.length == 0) {
        return null;
    }

    const value = userInput[0];

    if (typeof value !== 'string') {
        return null;
    }

    // Do some sanitization
    return value
        .trim()
        .replace('/', '')
        .replace('\\', '')
}

module.exports = getPreferredVersion
