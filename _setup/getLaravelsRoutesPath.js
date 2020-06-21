const path = require('path');

/**
 * @param {number} laravelVersion
 * @param {string} versionDir
 * @return {string}
 */
function getLaravelsRoutesPath (laravelVersion, versionDir) {
    let routesBasePath = 'app/Http/routes.php';
    if (laravelVersion > 5.2) {
        routesBasePath = 'routes/web.php';
    }

    return path.resolve(versionDir, routesBasePath);
}

module.exports = getLaravelsRoutesPath
