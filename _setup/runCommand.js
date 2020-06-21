const execa = require('execa');
const colors = require('colors');

/**
 * Runs given command and pipe stdout to a current process.
 *
 * @param {string} command
 * @param {Array} commandArgs
 * @param {string} cwd Defines commands working directory
 * @param {boolean} pipeOutput
 * @param {Object} env Environment key-value pairs.
 *
 * @return {Promise<execa.ExecaChildProcess>}
 */
async function run (command, commandArgs, cwd, pipeOutput = false, env = {}) {
    const commandInString = colors.gray(command + ' ' + commandArgs.join(' '))
    console.log(colors.green('🏋️‍ ️ Running ') + commandInString)

    const options = {cwd: cwd, env: env}
    const commandProcess = execa(command, commandArgs, options);

    if (pipeOutput) {
        commandProcess.stdout.pipe(process.stdout);
        commandProcess.stderr.pipe(process.stderr);
    }

    await commandProcess

    console.log(colors.green('🎉️‍ ️Done ') + (pipeOutput ? commandInString : ''))
    console.log(' ')

    return commandProcess
}

module.exports = run
