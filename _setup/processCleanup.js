const colors = require('colors');

// Tell child process to stop when exit is indicated.
const state = {
    /** @type {execa.ExecaChildProcess|null} */
    currentProcess: null
}

function exitHandler (options, exitCodeOrError, type) {
    // Kill any running app
    if (state.currentProcess !== null) {
        console.log(' ')
        const command = colors.gray(state.currentProcess.spawnargs.join(' '))
        console.log(colors.red('🚦 Killing ') + command)

        state.currentProcess.kill();
        state.currentProcess = null;
    }

    // Handle error in code
    if (typeof type === 'string' && type === 'uncaughtException') {
        console.log(exitCodeOrError)
    }

    if (options.exit) {
        process.exit(1);
    }
}

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit: true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit: true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit: true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit: true}));

module.exports = {
    state: state,
}
