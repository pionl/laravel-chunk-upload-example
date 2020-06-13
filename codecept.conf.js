exports.config = {
    tests: 'tests/*_test.js',
    output: './output',
    helpers: {
        Puppeteer: {
            url: 'http://laravel:8000',
            show: false,
            windowSize: '1200x900',
            waitForNavigation: "networkidle0",
            chrome: {
                args: ["--headless", "--no-sandbox" ]
            }
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
        screenshotOnFail: {
            enabled: true
        }
    }
}
