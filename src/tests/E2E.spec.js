const { test, expect } = require('@playwright/test');

test('Initial load', async ({ page }) => {
    await page.goto('http://localhost:5000/');
    const title = page.locator('h1');
    await expect(title).toHaveText('recycle things!');
});


