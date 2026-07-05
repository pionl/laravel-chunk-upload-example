const http = require('http');

function delay (timeout, signal) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(resolve, timeout);

        function abortListener () {
            clearTimeout(timer);
            reject(new Error('Aborted'));
        }

        if (signal) {
            if (signal.aborted) {
                abortListener();
                return;
            }

            signal.addEventListener('abort', abortListener, {once: true});
        }
    });
}

function requestUrl (url, signal) {
    return new Promise((resolve, reject) => {
        const request = http.get(url, function (response) {
            response.resume();
            resolve(response.statusCode || 0);
        });

        request.on('error', reject);
        request.setTimeout(1000, function () {
            request.destroy(new Error('Timed out'));
        });

        if (signal) {
            function abortListener () {
                request.destroy(new Error('Aborted'));
            }

            if (signal.aborted) {
                abortListener();
                return;
            }

            signal.addEventListener('abort', abortListener, {once: true});
        }
    });
}

async function waitForHttpReady (url, options = {}) {
    const timeout = options.timeout || 120000;
    const interval = options.interval || 1000;
    const signal = options.signal;
    const startedAt = Date.now();

    while ((Date.now() - startedAt) < timeout) {
        if (signal && signal.aborted) {
            throw new Error('Aborted');
        }

        try {
            await requestUrl(url, signal);
            return;
        } catch (error) {
            if (error.message === 'Aborted') {
                throw error;
            }
        }

        await delay(interval, signal);
    }

    throw new Error(`Timed out waiting for ${url}`);
}

module.exports = waitForHttpReady
