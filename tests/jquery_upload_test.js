const assert = require('assert')

Feature('Test jquery upload');

Scenario('is able to upload an image', async (I) => {
    I.amOnPage('/jquery-file-upload')
    I.see('jQuery File Upload')

    // Upload and wait until file is uploaded
    I.attachFile('input[name=file]', 'test_image.jpeg');
    I.waitForElement('#file-upload-list li:nth-child(2)', 40);

    const text = await I.grabTextFrom('#file-upload-list li:nth-child(2)')

    assert.ok(typeof text === 'string', 'Invalid response: not text')
    assert.ok(text.indexOf('Uploaded: ') >= -1, 'Invalid response: missing Uploaded text');

    // Clean the url
    const uploadedFile = text
        .replace('Uploaded: ', '')
        .trim()
        .replace(' ', '')
        .replace('upload/', '')

    const response = await I.sendGetRequest(`/check/${uploadedFile}`);

    assert.strictEqual(response.status, 200, 'File was not uploaded')
    assert.strictEqual(response.data, 'c5ebe8da4df8f4242a6fc09344a07d06ea138242', 'SHA1 does not match')
});
