import type { Page } from '@playwright/test';

export async function setupPage(page: Page) {
  // access a page before evaluating script
  await page.goto('/');
  // Set authentication state
  await page.evaluate(() => {
    localStorage.setItem('user', '{"id":"123","email":"test@test.com"}');
  });
}
