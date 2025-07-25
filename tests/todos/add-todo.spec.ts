import { expect, test } from '@playwright/test';
import { setupPage } from '../setup';

test.describe('Add Todo Feature', () => {
  test.beforeEach(async ({ page }) => {
    // Mock create todo API
    await page.route('/api/todos*', async (route) => {
      const method = route.request().method();
      switch (method) {
        case 'POST':
          await route.fulfill({
            json: {
              id: 'new-todo-1',
              title: 'New Todo Item',
              status: 'pending',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          });
          break;

        case 'GET':
          await route.fulfill({
            json: [],
            headers: {
              'x-total-count': '0',
            },
          });
          break;
      }
    });

    await setupPage(page);
    await page.goto('/');
  });

  test('should display add todo form', async ({ page }) => {
    await expect(page.getByRole('textbox', { name: 'title' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add' })).toBeVisible();
  });

  test('should add new item to todo list when clicking add', async ({ page }) => {
    await page.getByRole('textbox', { name: 'title' }).fill('New Todo Item');
    await page.getByRole('button', { name: 'Add' }).click();

    // Should see the new todo in the list
    await expect(page.getByText('New Todo Item')).toBeVisible();

    // Input should be cleared after successful add
    await expect(page.getByRole('textbox', { name: 'title' })).toHaveValue('');
  });

  test('should call create todo API with correct parameters', async ({ page }) => {
    await page.route('/api/todos', async (route) => {
      const requestBody = await route.request().postDataJSON();
      const method = route.request().method();
      if (method === 'POST') {
        await route.fulfill({
          json: {
            id: 'test-todo',
            title: 'Test Todo',
            status: 'pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        });
      }

      await expect(method).toEqual('POST');
      await expect(requestBody).toMatchObject({
        title: 'Test Todo',
        status: 'pending',
      });
    });

    await page.getByPlaceholder('Title').fill('Test Todo');
    await page.getByRole('button', { name: 'Add' }).click();
  });

  test('should show error message and remove added item when request fails', async ({
    page,
  }) => {
    // Mock API failure
    await page.route('/api/todos', async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          status: 500,
          json: { message: 'Failed to create todo' },
        });
      }
    });

    await page.getByPlaceholder('Title').fill('Failed Todo');
    await page.getByRole('button', { name: 'Add' }).click();

    // Should show error notification
    await expect(page.getByText('Failed to create todo')).toBeVisible();

    // Optimistically added item should be removed from list
    await expect(page.getByText('Failed Todo')).not.toBeVisible();
  });

  test('should disable submit when input is empty', async ({ page }) => {
    await page.getByRole('textbox', { name: 'title' }).fill('');

    await expect(page.getByRole('button', { name: 'Add' })).toBeDisabled();
  });

  test('should disable submit when input contains only whitespace', async ({
    page,
  }) => {
    await page.getByPlaceholder('Title').fill('   ');

    await expect(page.getByRole('button', { name: 'Add' })).toBeDisabled();
  });

  test('should enable submit when input is filled', async ({ page }) => {
    await page.getByRole('textbox', { name: 'title' }).fill('some description');

    await expect(page.getByRole('button', { name: 'Add' })).toBeEnabled();
  });
});
