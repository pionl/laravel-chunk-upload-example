const { test, expect } = require('@playwright/test');

test('navigates to the jQuery upload example from the welcome page', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'jQuery-File-Upload example' }).click();

    await expect(page).toHaveURL(/\/jquery-file-upload$/);
    await expect(page.locator('div.title')).toContainText('jQuery File Upload');
});
