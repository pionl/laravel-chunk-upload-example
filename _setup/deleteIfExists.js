const fs = require('fs')
const colors = require('colors');
const path = require('path');

async function deleteIfExits (filePath, currentDirectory) {
    if (fs.existsSync(filePath) === false) {
        return
    }

    const fileName = path.relative(currentDirectory, filePath)
    console.log(colors.green('🧹 Deleting ') + colors.gray(fileName))

    fs.unlinkSync(filePath)
}

module.exports = deleteIfExits
