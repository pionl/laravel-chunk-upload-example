const { test, expect } = require('@playwright/test');
const { checkUploadSimpleResult } = require('./helpers');

test('uploads an image through Resumable.js', async ({ page }) => {
    await page.goto('/resumable');
    await expect(page.locator('div.title')).toContainText('Resumable');
    await expect(page.locator('#resumable-drop')).toBeVisible();
    await checkUploadSimpleResult(page)
});
