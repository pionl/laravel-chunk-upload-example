const { test, expect } = require('@playwright/test');
const { IMAGE_PATH, assertUploadedFile } = require('./helpers');

test('uploads an image through Dropzone', async ({ page }) => {
    await page.goto('/dropzone');
    await expect(page.locator('div.title')).toContainText('DropZone');

    await page.locator('input[name="file"]').setInputFiles(IMAGE_PATH);

    await assertUploadedFile(page);
});
