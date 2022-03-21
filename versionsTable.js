#!/usr/bin/env node
/** Generate a table with current installed Laravel versions */

const versions = require('./versions.json');
const table = require('markdown-table');
const path = require('path');
const fs = require('fs');

const currentDir = process.cwd();

const tableContents = [[
    'Version', 'PHP', 'Run', 'Tests'
]];
const versionList = [];

versions.reverse().forEach(function (version) {
    tableContents.push([
        version.laravel,
        version.image_version,
        '`node run  "' + version.laravel + '"`',
        '`node tests.js "' + version.laravel + '"`',
    ])
    //versionList.push('* ' + version.laravel + ' (last tested on ' + version.version + ')')
})

console.log(table(tableContents));

console.log(' ')

