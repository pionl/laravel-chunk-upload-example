const path = require('path');
const { expect } = require('@playwright/test');

const IMAGE_PATH = path.resolve(__dirname, '..', 'test_image.jpeg');
const EXPECTED_SHA1 = 'c5ebe8da4df8f4242a6fc09344a07d06ea138242';

function normalizeUploadedFilePath(uploadedFile) {
    return uploadedFile.replace('storage/upload/', '');
}

async function assertUploadedFilePath(page, uploadedFile) {
    const response = await page.request.get(`/check/${uploadedFile}`);
    expect(response.status()).toBe(200);
    expect(await response.text()).toBe(EXPECTED_SHA1);
}

async function assertUploadedFile(page) {
    const uploadedItem = page.locator('#file-upload-list li', { hasText: 'Uploaded: ' }).last();

    await expect(uploadedItem).toBeVisible();

    const text = await uploadedItem.textContent();
    expect(text).toContain('Uploaded: ');

    const uploadedFile = normalizeUploadedFilePath(
        text
            .replace('Uploaded: ', '')
            .trim()
    );

    await assertUploadedFilePath(page, uploadedFile);
}

module.exports = {
    IMAGE_PATH,
    assertUploadedFile,
    assertUploadedFilePath,
    normalizeUploadedFilePath,
};
