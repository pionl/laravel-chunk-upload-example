const fs = require('fs');

/**
 * Alters the app config file (php) and adds a given service provider after RouteServiceProvider.
 * @param appConfigPath
 * @param serviceProviderClass
 */
function addServiceProvider (appConfigPath, serviceProviderClass) {
    if (fs.existsSync(appConfigPath) === false) {
        throw new Error('App config not exists at ' + appConfigPath)
    }

    const appContents = fs.readFileSync(appConfigPath, 'utf8');

    // Do not add service provider if config already contains the serviceProviderClass
    if (appContents.indexOf(serviceProviderClass) !== -1) {
        return;
    }

    const addEntryAfter = 'App\\Providers\\RouteServiceProvider::class,';
    const newEntry = addEntryAfter + '\n        ' + serviceProviderClass + ',\n';
    const newAppContents = appContents.replace(addEntryAfter, newEntry)

    fs.writeFileSync(appConfigPath, newAppContents, 'utf8')
}

module.exports = addServiceProvider;
