#!/usr/bin/env node
/** Generate a table with current installed Laravel versions */

const versions = require('./versions.json');
const table = require('markdown-table');
const path = require('path');
const fs = require('fs');

const currentDir = process.cwd();

const tableContents = [[
    'Folder', 'Laravel version', 'Setup', 'Tests'
]];
const versionList = [];

versions.reverse().forEach(function (version) {
    const composerLock = path.join(currentDir, version.laravel, 'composer.lock');

    if (fs.existsSync(composerLock) === false) {
        throw new Error(`Laravel ${version.laravel} not installed - missing compsoer.lock`)
    }

    const composerContents = fs.readFileSync(composerLock, 'utf8')
    const composerJson = JSON.parse(composerContents);

    composerJson.packages.forEach(function (package) {
        if (package.name === 'laravel/framework') {
            tableContents.push([
                version.laravel,
                package.version,
                '`node setup.js "' + version.laravel + '"`',
                '`node tests.js "' + version.laravel + '"`',
                '`php ' + version.laravel.replace('*', '\\*') + '/artisan serve  --host=0.0.0.0 --port=8000`',
            ])
            versionList.push('* ' + version.laravel + ' (last tested on ' + package.version + ')')
            return false;
        }
    });
})

console.log(table(tableContents));

console.log(' ')

console.log(versionList.join('\n'))
