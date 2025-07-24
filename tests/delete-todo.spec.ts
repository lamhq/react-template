import { expect, test } from '@playwright/test';

// Mock data: 3 todo items
const mockTodos = Array.from({ length: 3 }, (_, i) => ({
  id: `todo-${i + 1}`,
  title: `Todo item ${i + 1}`,
  description: `Description for todo ${i + 1}`,
  status: i % 3 === 0 ? 'completed' : i % 3 === 1 ? 'in_progress' : 'pending',
  createdAt: new Date(Date.now() - i * 1000 * 60 * 60).toISOString(),
  updatedAt: new Date(Date.now() - i * 1000 * 60 * 60).toISOString(),
}));

test.describe('Delete Todo Feature', () => {
  test.beforeEach(async ({ page }) => {
    // Mock API routes
    await page.route('/api/todos*', async (route) => {
      // return todo list
      if (route.request().method() === 'GET') {
        await route.fulfill({
          json: mockTodos,
          headers: {
            'x-total-count': mockTodos.length.toString(),
          },
        });
      }
    });

    // access a page before evaluating script
    await page.goto('/');
    // Set authentication state
    await page.evaluate(() => {
      localStorage.setItem('user', '{"id":"123","email":"test@test.com"}');
    });
    // revisit the page
    await page.reload();
  });

  test('should remove item when clicking delete', async ({ page }) => {
    await page.route('/api/todos/todo-1', async (route) => {
      // simulate delete success
      if (route.request().method() === 'DELETE') {
        await route.fulfill({ status: 204 });
      }
    });

    // Wait for todos to load
    await expect(page.getByText('Todo item 1', { exact: true })).toBeVisible();

    // Click the delete button for the second todo
    await page.getByTitle('Delete todo').nth(0).click();

    // Should show confirmation dialog
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('Delete Todo')).toBeVisible();
    await expect(
      page.getByText('Are you sure you want to delete "Todo item 1"?'),
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Delete' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();

    // Confirm deletion
    await page.getByRole('button', { name: 'Delete' }).click();

    // The first todo should be removed from the list
    await expect(page.getByText('Todo item 1', { exact: true })).not.toBeVisible();

    // Other todos should still be visible
    await expect(page.getByText('Todo item 2', { exact: true })).toBeVisible();
    await expect(page.getByText('Todo item 3', { exact: true })).toBeVisible();
  });

  test('should revert to previous state when request fails', async ({ page }) => {
    // Add a special todo that will trigger API failure
    await page.route('/api/todos/todo-1', async (route) => {
      // simulate delete failure
      if (route.request().method() === 'DELETE') {
        await route.fulfill({ status: 404 });
      }
    });

    // Wait for todos to load
    await expect(page.getByText('Todo item 1', { exact: true })).toBeVisible();

    // Click the delete button for the second todo
    await page.getByTitle('Delete todo').nth(0).click();

    // Should show confirmation dialog
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('Delete Todo')).toBeVisible();
    await expect(
      page.getByText('Are you sure you want to delete "Todo item 1"?'),
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Delete' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();

    // Confirm deletion
    await page.getByRole('button', { name: 'Delete' }).click();

    // The first todo should still be visible
    await expect(page.getByText('Todo item 1', { exact: true })).toBeVisible();

    // Other todos should still be visible
    await expect(page.getByText('Todo item 2', { exact: true })).toBeVisible();
    await expect(page.getByText('Todo item 3', { exact: true })).toBeVisible();
  });

  test('should not remove item when cancel', async ({ page }) => {
    // Wait for todos to load
    await expect(page.getByText('Todo item 1', { exact: true })).toBeVisible();
    await expect(page.getByText('Todo item 2', { exact: true })).toBeVisible();
    await expect(page.getByText('Todo item 3', { exact: true })).toBeVisible();

    // Click the delete button for the first todo
    await page.getByTitle('Delete todo').first().click();

    // Cancel deletion
    await page.getByRole('button', { name: 'Cancel' }).click();

    // All todos should still be visible
    await expect(page.getByText('Todo item 1', { exact: true })).toBeVisible();
    await expect(page.getByText('Todo item 2', { exact: true })).toBeVisible();
    await expect(page.getByText('Todo item 3', { exact: true })).toBeVisible();

    // Dialog should be closed
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });
});
