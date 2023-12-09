import { test } from '@playwright/test';
import url from 'node:url';

test('create events screenshot', async ({ page }) => {
  await page.goto(url.resolve(import.meta.url, '../src/2023/events.html'));
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: 'src/static/events-screenshot.png',
    clip: { x: 0, y: 0, width: 1030, height: 420 },
  });
});

test('create solver screenshot', async ({ page }) => {
  await page.goto(url.resolve(import.meta.url, '../src/2023/solver.html'));
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: 'src/static/solver-screenshot.png',
    clip: { x: 0, y: 0, width: 1030, height: 420 },
  });
});
