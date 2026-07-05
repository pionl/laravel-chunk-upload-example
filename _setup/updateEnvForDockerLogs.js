const fs = require('fs');
const path = require('path');

const REQUIRED_ENV_VALUES = {
    LOG_CHANNEL: 'stderr',
    LOG_STACK: 'stderr',
    LOG_LEVEL: 'debug',
};

function updateOrAppendEnvValue(contents, key, value) {
    const pattern = new RegExp(`^${key}=.*$`, 'm');

    if (pattern.test(contents)) {
        return contents.replace(pattern, `${key}=${value}`);
    }

    const suffix = contents.endsWith('\n') ? '' : '\n';

    return `${contents}${suffix}${key}=${value}\n`;
}

function updateEnvForDockerLogs(versionDir) {
    const envPath = path.resolve(versionDir, '.env');

    if (!fs.existsSync(envPath)) {
        return;
    }

    let contents = fs.readFileSync(envPath, 'utf8');

    Object.entries(REQUIRED_ENV_VALUES).forEach(([key, value]) => {
        contents = updateOrAppendEnvValue(contents, key, value);
    });

    fs.writeFileSync(envPath, contents, 'utf8');
}

module.exports = updateEnvForDockerLogs;
