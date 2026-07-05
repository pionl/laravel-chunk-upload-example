const { test, expect } = require('@playwright/test');
const { IMAGE_PATH, assertUploadedFile } = require('./helpers');

test('uploads an image through the jQuery uploader', async ({ page }) => {
    await page.goto('/jquery-file-upload');
    await expect(page.locator('div.title')).toContainText('jQuery File Upload');

    await page.locator('input[name="file"]').setInputFiles(IMAGE_PATH);

    await assertUploadedFile(page);
});
