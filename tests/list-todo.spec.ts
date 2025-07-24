import { expect, test } from '@playwright/test';

// Mock data: 11 todo items to test pagination (10 per page + 1 extra)
const mockTodos = Array.from({ length: 11 }, (_, i) => ({
  id: `todo-${i + 1}`,
  title: `Todo item ${i + 1}`,
  description: `Description for todo ${i + 1}`,
  status: i % 3 === 0 ? 'completed' : i % 3 === 1 ? 'in_progress' : 'pending',
  createdAt: new Date(Date.now() - i * 1000 * 60 * 60).toISOString(),
  updatedAt: new Date(Date.now() - i * 1000 * 60 * 60).toISOString(),
}));

test.describe('List Todo Feature', () => {
  test.beforeEach(async ({ page }) => {
    // Default Mock API response with 11 todos (can be overridden in individual tests)
    await page.route('/api/todos*', async (route) => {
      const url = new URL(route.request().url());
      const offset = parseInt(url.searchParams.get('offset') || '0');
      const limit = parseInt(url.searchParams.get('limit') || '10');
      const paginatedTodos = mockTodos.slice(offset, offset + limit);
      await route.fulfill({
        json: paginatedTodos,
        headers: {
          'x-total-count': mockTodos.length.toString(),
        },
      });
    });

    // Wait for redirect to home page
    await page.goto('/');

    // Set authentication state to be logged
    await page.evaluate(() => {
      localStorage.setItem('user', '{"id":"123","email":"test@test.com"}');
    });
  });

  test('should show loading on start', async ({ page }) => {
    // Override default API mock to add delay for capturing loading state
    await page.route('/api/todos*', async (route) => {
      // Delay the response to capture loading state
      await new Promise((resolve) => setTimeout(resolve, 200));

      const url = new URL(route.request().url());
      const offset = parseInt(url.searchParams.get('offset') || '0');
      const limit = parseInt(url.searchParams.get('limit') || '10');
      const paginatedTodos = mockTodos.slice(offset, offset + limit);
      await route.fulfill({
        json: paginatedTodos,
        headers: {
          'x-total-count': mockTodos.length.toString(),
        },
      });
    });

    // Navigate to todo list page (already on home page from beforeEach)
    await page.reload();

    // Should show loading indicator
    await expect(page.getByRole('progressbar')).toBeVisible();
  });

  test('should display items from the first page by default', async ({ page }) => {
    // Uses default API mock from beforeEach (11 todos)

    // Reload to trigger fresh API call
    await page.reload();

    // Wait for loading to complete
    await expect(page.getByRole('progressbar')).not.toBeVisible();

    // Should display the first 10 todo items (first page)
    for (let i = 0; i < 10; i++) {
      await expect(
        page.getByText(`Todo item ${i + 1}`, { exact: true }),
      ).toBeVisible();
    }

    // Should not display the 11th item on first page
    await expect(page.getByText('Todo item 11')).not.toBeVisible();
  });

  test('should display empty state if no items returned from server', async ({
    page,
  }) => {
    // Override default API mock to return empty array
    await page.route('/api/todos*', async (route) => {
      await route.fulfill({
        json: [],
        headers: {
          'x-total-count': '0',
        },
      });
    });

    // Reload to trigger fresh API call
    await page.reload();

    // Wait for loading to complete
    await expect(page.getByRole('progressbar')).not.toBeVisible();

    // Should display empty state message
    await expect(page.getByText(/no todos found/i)).toBeVisible();
  });

  test('should display 2 pagination items', async ({ page }) => {
    // Uses default API mock from beforeEach (11 todos requires 2 pages)

    // Reload to trigger fresh API call
    await page.reload();

    // Wait for loading to complete
    await expect(page.getByRole('progressbar')).not.toBeVisible();

    // Should display pagination with 2 page buttons
    await expect(page.getByRole('button', { name: '1' })).toBeVisible();
    await expect(page.getByRole('button', { name: '2' })).toBeVisible();

    // Should not have a third page button
    await expect(page.getByRole('button', { name: '3' })).not.toBeVisible();

    // First page should be active/selected
    await expect(page.getByRole('button', { name: '1' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  test('should display items in page 2 when clicking page 2', async ({ page }) => {
    // Uses default API mock from beforeEach (11 todos)

    // Reload to trigger fresh API call
    await page.reload();

    // Wait for loading to complete
    await expect(page.getByRole('progressbar')).not.toBeVisible();

    // Click on page 2
    await page.getByRole('button', { name: '2' }).click();

    // Wait for new data to load
    await expect(page.getByRole('progressbar')).not.toBeVisible();

    // Should display only the 11th item (page 2 content)
    await expect(page.getByText('Todo item 11')).toBeVisible();

    // Should not display items from page 1
    await expect(page.getByText('Todo item 1', { exact: true })).not.toBeVisible();
    await expect(page.getByText('Todo item 10', { exact: true })).not.toBeVisible();

    // Page 2 should be active/selected
    await expect(page.getByRole('button', { name: '2' })).toHaveAttribute(
      'aria-current',
      'page',
    );

    // Count the number of todo items visible (should be 1)
    await expect(page.getByText('Todo item')).toHaveCount(1);
  });
});
