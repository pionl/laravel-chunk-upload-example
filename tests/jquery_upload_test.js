
Feature('Test jquery upload');

Scenario('is able to upload an image', async (I) => {
    I.amOnPage('/jquery-file-upload')
    I.see('jQuery File Upload')

    await I.assertUpload()
});
