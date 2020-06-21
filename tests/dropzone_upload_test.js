const assert = require('assert')

Feature('Test dropzone upload');

Scenario('is able to upload an image', async (I) => {
    I.amOnPage('/dropzone')
    I.see('DropZone')

    await I.assertUpload()
});
