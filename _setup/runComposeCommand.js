const colors = require('colors');
const execa = require('execa');
const {clearActiveProcess, setActiveProcess, state} = require('./processCleanup.js');

function cleanString (string) {
    return String(string).replace(/[^a-zA-Z0-9_-]/g, '')
}

function getComposeProjectName (version, prefix = 'chunk-laravel') {
    return `${prefix}-${cleanString(version.image_version)}-${cleanString(version.laravel)}`;
}

function getComposeArgs (projectName, files, extraArgs = []) {
    const composeArgs = ['compose', `-p=${projectName}`];

    files.forEach(function (file) {
        composeArgs.push('-f', file);
    });

    return composeArgs.concat(extraArgs);
}

async function runComposeCommand (version, cwd, pipeOutput, options = {}) {
    const files = options.files || ['docker-compose.yml', 'docker-compose.override.yml'];
    const projectName = options.projectName || getComposeProjectName(version, options.projectPrefix);
    const environmentVars = {
        IMAGE_VERSION: version.image_version,
        LARAVEL_VERSION: version.laravel,
    };
    const upArgs = getComposeArgs(projectName, files, ['up'].concat(options.upArgs || []));
    const stopArgs = getComposeArgs(projectName, files, ['stop']);
    const commandInString = colors.gray(`docker ${upArgs.join(' ')} ${JSON.stringify(environmentVars)}`);
    const commandProcess = execa('docker', upArgs, {cwd: cwd, env: environmentVars});
    const readinessAbortController = typeof options.readinessCheck === 'function' ? new AbortController() : null;

    console.log(colors.green('💪 Running ') + commandInString)

    async function stopComposeProject () {
        if (state.isCleaningUp === false) {
            return;
        }

        const stopCommand = colors.gray(`docker ${stopArgs.join(' ')} ${JSON.stringify(environmentVars)}`);
        console.log(colors.green('🧹 Stopping ') + stopCommand)

        await execa('docker', stopArgs, {cwd: cwd, env: environmentVars});
    }

    setActiveProcess(commandProcess, stopComposeProject);

    if (pipeOutput) {
        commandProcess.stdout.pipe(process.stdout);
        commandProcess.stderr.pipe(process.stderr);
    }

    if (readinessAbortController !== null) {
        commandProcess.finally(() => {
            readinessAbortController.abort();
        });

        options.readinessCheck({
            signal: readinessAbortController.signal
        }).catch(error => {
            if (error.message !== 'Aborted' && !error.message.includes('Command failed with exit code 130')) {
                console.log(colors.red('🙈 ' + error.message));
            }
        });
    }

    try {
        await commandProcess;

        console.log(colors.green('🎉️‍ ️Done ') + (pipeOutput ? commandInString : ''))
        console.log(' ')

        clearActiveProcess(commandProcess);

        return commandProcess
    } catch (error) {
        clearActiveProcess(commandProcess);

        if (pipeOutput) {
            console.log(colors.red('🙈 Something went wrong ') + commandInString)
        }

        throw error
    }
}

module.exports = {
    getComposeProjectName,
    runComposeCommand,
}
