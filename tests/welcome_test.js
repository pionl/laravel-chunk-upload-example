Feature('Test welcome screen');

Scenario('is able to click on dropzone', (I) => {
    I.amOnPage('/');
    I.click('jQuery-File-Upload example')
    I.amOnPage('/jquery-file-upload')
    I.see('jQuery File Upload')
});
