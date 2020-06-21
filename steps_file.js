// in this file you can append custom step methods to 'I' object
const assert = require('assert')

module.exports = function () {
    return actor({
        assertUpload: async function () {
            // Upload and wait until file is uploaded
            this.attachFile('input[name=file]', 'test_image.jpeg');
            this.waitForElement('#file-upload-list li:nth-child(2)', 40);

            const text = await this.grabTextFrom('#file-upload-list li:nth-child(2)')

            assert.ok(typeof text === 'string', 'Invalid response: not text')
            assert.ok(text.indexOf('Uploaded: ') >= -1, 'Invalid response: missing Uploaded text');

            // Clean the url
            const uploadedFile = text
                .replace('Uploaded: ', '')
                .trim()
                .replace('upload/', '')

            const response = await this.sendGetRequest(`/check/${uploadedFile}`);

            assert.strictEqual(response.status, 200, 'File was not uploaded')
            assert.strictEqual(response.data, 'c5ebe8da4df8f4242a6fc09344a07d06ea138242', 'SHA1 does not match')
        }
    });
}
