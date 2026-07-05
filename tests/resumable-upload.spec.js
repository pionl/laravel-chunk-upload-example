const { test, expect } = require('@playwright/test');
const { IMAGE_PATH, assertUploadedFilePath, normalizeUploadedFilePath } = require('./helpers');

test('uploads an image through Resumable.js', async ({ page }) => {
    await page.goto('/resumable');
    await expect(page.locator('div.title')).toContainText('Resumable');
    await expect(page.locator('#resumable-drop')).toBeVisible();

    const uploadResponsePromise = page.waitForResponse(async (response) => {
        if (!response.url().includes('/api/upload') || response.request().method() !== 'POST') {
            return false;
        }

        try {
            const payload = await response.json();
            return typeof payload.path === 'string' && typeof payload.name === 'string';
        } catch (error) {
            return false;
        }
    });

    const fileInput = page.locator('input[type="file"]').last();
    await expect(fileInput).toBeAttached();
    await fileInput.setInputFiles(IMAGE_PATH);

    await expect(page.locator('#file-upload-list')).toBeVisible();
    await expect(page.locator('#file-upload-list li').last()).toContainText('(completed)');

    const uploadResponse = await uploadResponsePromise;
    const payload = await uploadResponse.json();
    const uploadedFile = normalizeUploadedFilePath(`${payload.path}${payload.name}`);

    await assertUploadedFilePath(page, uploadedFile);
});
