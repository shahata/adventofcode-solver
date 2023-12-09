import { test } from '@playwright/test';

test('create screenshot', async ({ page }) => {
  await page.goto('/');
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: 'test-results/screenshot.png',
    clip: { x: 0, y: 0, width: 1030, height: 420 },
  });
});
