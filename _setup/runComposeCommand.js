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
    const downArgs = getComposeArgs(projectName, files, ['down', '--volumes', '--remove-orphans']);
    const commandInString = colors.gray(`docker ${upArgs.join(' ')} ${JSON.stringify(environmentVars)}`);
    const commandProcess = execa('docker', upArgs, {cwd: cwd, env: environmentVars});
    const readinessAbortController = typeof options.readinessCheck === 'function' ? new AbortController() : null;

    console.log(colors.green('💪 Running ') + commandInString)

    async function cleanupComposeProject () {
        const downCommand = colors.gray(`docker ${downArgs.join(' ')} ${JSON.stringify(environmentVars)}`);
        console.log(colors.green('🧹 Cleaning up ') + downCommand)

        await execa('docker', downArgs, {cwd: cwd, env: environmentVars});
    }

    setActiveProcess(commandProcess, async () => {
        if (state.isCleaningUp) {
            await cleanupComposeProject();
        }
    });

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

        return commandProcess
    } catch (error) {
        if (pipeOutput) {
            console.log(colors.red('🙈 Something went wrong ') + commandInString)
        }

        throw error
    } finally {
        clearActiveProcess(commandProcess);

        if (options.cleanup) {
            await cleanupComposeProject();
        }
    }
}

module.exports = {
    getComposeProjectName,
    runComposeCommand,
}
