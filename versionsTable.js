#!/usr/bin/env node
/** Generate a table with current installed Laravel versions */

const versions = require('./versions.json');
const table = require('markdown-table');

const groupedVersions = {};
// First group it by laravel version
versions.forEach(function (version) {
    if (!groupedVersions[version.laravel]) {
        groupedVersions[version.laravel] = [];
    }
    groupedVersions[version.laravel].push(version.image_version);
});

const tableContents = [[
    'Laravel', 'PHP', 'Run', 'Tests'
]];

// Get Laravel versions and sort them descending
const laravelVersions = Object.keys(groupedVersions).sort((a, b) => {
    return parseInt(b) - parseInt(a);
});

laravelVersions.forEach(function (laravel) {
    tableContents.push([
        laravel,
        groupedVersions[laravel].join(', '),
        '`node run "' + laravel + '"`',
        '`node tests.js "' + laravel + '"`',
    ]);
});

console.log(table(tableContents));

console.log(' ')

