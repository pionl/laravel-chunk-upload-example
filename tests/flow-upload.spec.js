const { test, expect } = require('@playwright/test');
const { checkUploadSimpleResult } = require('./helpers');


test('uploads an image through Flow.js', async ({ page }) => {
    await page.goto('/flow');
    await expect(page.locator('div.title')).toContainText('Flow.js');
    await expect(page.locator('#flow-drop')).toBeVisible();
    await checkUploadSimpleResult(page)
});
