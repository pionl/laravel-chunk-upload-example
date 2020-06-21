const colors = require('colors');

/**
 * Wraps given function in async call that will catch and exit program
 * @param {NodeJS.Process} process
 * @param {meow.Result} cli
 * @param {string} task
 * @param {function} run
 * @return {Promise<void>}
 */
function program (process, cli, task, run) {
    console.log(colors.green(task + ' ' + cli.pkg.name));

    if (cli.flags.verbose === false) {
        console.log(colors.gray('Something unexpected? Use --verbose to se all output'));
    }
    console.log(' ');

    return (async () => {
        await run()
    })().catch(error => {
        console.log(colors.red('🙈 ' + error.message));
        if (cli.flags.verbose) {
            console.log(error);
        }
        process.exit(1)
    });
}

module.exports = program
