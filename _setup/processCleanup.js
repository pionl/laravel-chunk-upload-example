const colors = require('colors');

const state = {
    /** @type {execa.ExecaChildProcess|null} */
    currentProcess: null,
    /** @type {(null|function(): Promise<void>)} */
    cleanup: null,
    /** @type {Promise<void>|null} */
    cleanupPromise: null,
    isCleaningUp: false
}

function setActiveProcess (currentProcess, cleanup = null) {
    state.currentProcess = currentProcess;
    state.cleanup = cleanup;
}

function clearActiveProcess (currentProcess = null) {
    if (currentProcess === null || state.currentProcess === currentProcess) {
        state.currentProcess = null;
        state.cleanup = null;
    }
}

async function cleanupActiveProcess () {
    if (state.cleanupPromise !== null) {
        return state.cleanupPromise;
    }

    state.isCleaningUp = true;
    state.cleanupPromise = (async () => {
        const currentProcess = state.currentProcess;
        const cleanup = state.cleanup;

        if (currentProcess !== null) {
            console.log(' ')
            const command = colors.gray(currentProcess.spawnargs.join(' '))
            console.log(colors.red('🚦 Killing ') + command)

            currentProcess.kill('SIGTERM', {
                forceKillAfterTimeout: 5000
            });

            try {
                await currentProcess;
            } catch (error) {
                // Cleanup continues after the foreground command exits.
            }
        }

        if (typeof cleanup === 'function') {
            await cleanup();
        }

        clearActiveProcess(currentProcess);
    })().finally(() => {
        state.cleanupPromise = null;
        state.isCleaningUp = false;
    });

    return state.cleanupPromise;
}

async function exitHandler (options, exitCodeOrError, type) {
    try {
        await cleanupActiveProcess();
    } catch (cleanupError) {
        console.log(colors.red('🙈 Cleanup failed ' + cleanupError.message));
    }

    if (typeof type === 'string' && type === 'uncaughtException') {
        if (typeof exitCodeOrError !== 'string' || !exitCodeOrError.includes('Command failed with exit code 130')) {
            console.log(exitCodeOrError)
        }
    }

    if (options.exit) {
        const exitCode = typeof exitCodeOrError === 'number' ? exitCodeOrError : 1;
        process.exit(exitCode);
    }
}

function registerExitHandler (event, options) {
    process.on(event, (...args) => {
        void exitHandler(options, ...args);
    });
}

registerExitHandler('SIGINT', {exit: true});
registerExitHandler('SIGTERM', {exit: true});

// catches "kill pid" (for example: nodemon restart)
registerExitHandler('SIGUSR1', {exit: true});
registerExitHandler('SIGUSR2', {exit: true});

//catches uncaught exceptions
registerExitHandler('uncaughtException', {exit: true});

module.exports = {
    cleanupActiveProcess,
    clearActiveProcess,
    setActiveProcess,
    state: state,
}
