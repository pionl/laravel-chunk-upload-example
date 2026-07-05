const run = require('./runCommand.js');

/**
 * @param {string} exampleDirectory
 * @param {boolean} verbose
 * @return {Promise<void>}
 */
async function compileExample (exampleDirectory, verbose) {
    await run('npm', ['run', 'build'], exampleDirectory, verbose)
}

module.exports = compileExample
