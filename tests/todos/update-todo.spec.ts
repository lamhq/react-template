import { expect, test } from '@playwright/test';
import { setupPage } from '../setup';

const mockTodos = [
  {
    id: 'test-todo-1',
    title: 'Test Todo Item 1',
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'test-todo-2',
    title: 'Test Todo Item 2',
    status: 'completed',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

test.describe('Update Todo Feature', () => {
  test.beforeEach(async ({ page }) => {
    // Mock get todo API
    await page.route('/api/todos*', async (route) => {
      const method = route.request().method();
      if (method === 'GET') {
        await route.fulfill({
          json: mockTodos,
          headers: {
            'x-total-count': mockTodos.length.toString(),
          },
        });
      }
    });

    await setupPage(page);
    await page.goto('/');
  });

  test('check the checkbox should update status of todo item to completed', async ({
    page,
  }) => {
    // Mock successful update API
    await page.route('/api/todos/test-todo-1', async (route) => {
      const method = route.request().method();
      if (method === 'PATCH') {
        await route.fulfill({
          json: {
            ...mockTodos[0],
            status: 'completed',
            updatedAt: new Date().toISOString(),
          },
        });
      }
    });

    // Find the pending todo item and its checkbox
    const todoItem = page.getByText('Test Todo Item 1');
    await expect(todoItem).toBeVisible();

    // Find the checkbox for the first todo item (pending)
    const checkbox = page.locator('input[type="checkbox"]').first();
    await expect(checkbox).not.toBeChecked();

    // Check the checkbox
    await checkbox.click();

    // Verify the checkbox is now checked (optimistic update)
    await expect(checkbox).toBeChecked();

    // Verify the todo text has strikethrough styling (completed state)
    await expect(todoItem).toHaveCSS('text-decoration-line', 'line-through');
  });

  test('uncheck the checkbox should update status of todo item to pending', async ({
    page,
  }) => {
    // Mock successful update API
    await page.route('/api/todos/test-todo-2', async (route) => {
      const method = route.request().method();
      if (method === 'PATCH') {
        await route.fulfill({
          json: {
            ...mockTodos[1],
            status: 'pending',
            updatedAt: new Date().toISOString(),
          },
        });
      }
    });

    // Find the completed todo item and its checkbox
    const todoItem = page.getByText('Test Todo Item 2');
    await expect(todoItem).toBeVisible();

    // Find the checkbox for the second todo item (completed)
    const checkbox = page.locator('input[type="checkbox"]').nth(1);
    await expect(checkbox).toBeChecked();

    // Verify the todo text initially has strikethrough styling
    await expect(todoItem).toHaveCSS('text-decoration-line', 'line-through');

    // Uncheck the checkbox
    await checkbox.click();

    // Verify the checkbox is now unchecked (optimistic update)
    await expect(checkbox).not.toBeChecked();

    // Verify the todo text no longer has strikethrough styling (pending state)
    await expect(todoItem).toHaveCSS('text-decoration-line', 'none');
  });

  test('should show error message and revert item status when request fails', async ({
    page,
  }) => {
    // Mock API failure
    await page.route('/api/todos/test-todo-1', async (route) => {
      const method = route.request().method();
      if (method === 'PATCH') {
        await route.fulfill({
          status: 500,
          json: { message: 'Failed to update todo' },
        });
      }
    });

    // Find the pending todo item and its checkbox
    const todoItem = page.getByText('Test Todo Item 1');
    await expect(todoItem).toBeVisible();

    // Find the checkbox for the first todo item (pending)
    const checkbox = page.locator('input[type="checkbox"]').first();
    await expect(checkbox).not.toBeChecked();

    // Verify initial state - no strikethrough
    await expect(todoItem).toHaveCSS('text-decoration-line', 'none');

    // Check the checkbox (this will trigger optimistic update then error)
    await checkbox.click();

    // Wait for error notification to appear
    await expect(page.getByText('Failed to update todo')).toBeVisible();

    // Verify the checkbox is reverted back to unchecked state
    await expect(checkbox).not.toBeChecked();

    // Verify the todo text is reverted back to no strikethrough (pending state)
    await expect(todoItem).toHaveCSS('text-decoration-line', 'none');
  });
});
