const url = process.env.CODECEPT_URL || 'http://localhost:8000'

exports.config = {
    tests: 'tests/*_test.js',
    output: './output',
    helpers: {
        Puppeteer: {
            url: url,
            show: process.env.CODECEPT_DEBUG ? true : false,
            windowSize: '1200x900',
            waitForNavigation: "networkidle0",
            chrome: {
                args: process.env.CODECEPT_DEBUG ? [] : ["--headless", "--no-sandbox"]
            }
        },
        REST: {
            endpoint: url,
        }
    },
    include: {
        I: './steps_file.js'
    },
    bootstrap: null,
    mocha: {},
    name: 'laravel-chunk-upload-example',
    plugins: {
        retryFailedStep: {
            enabled: true
        },
    }
}
