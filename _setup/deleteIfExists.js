const fs = require('fs')
const colors = require('colors');
const path = require('path');

async function deleteIfExits (filePath, currentDirectory) {
    const fileName = path.relative(currentDirectory, filePath)

    if (fs.existsSync(filePath) === false) {
        console.log(colors.green('🧹 Already deleted ') + colors.gray(fileName))

        return
    }

    console.log(colors.green('🧹 Deleting ') + colors.gray(fileName))

    fs.unlinkSync(filePath)
}

module.exports = deleteIfExits
