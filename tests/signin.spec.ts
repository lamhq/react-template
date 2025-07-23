import { expect, test } from '@playwright/test';

test.describe('Sign In', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sign-in');
  });

  test('should display sign in form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Welcome!' })).toBeVisible();
    await expect(page.getByText('Sign in to continue.')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
  });

  test('should sign in successfully with valid credentials', async ({ page }) => {
    // Mock the api call before navigating
    await page.route('/api/auth/access-tokens', async (route) => {
      const json = {
        user: {
          id: '123',
          email: 'test@test.com',
        },
      };
      await route.fulfill({ json });
    });

    await page.getByLabel('Email').fill('test@test.com');
    await page.getByLabel('Password').fill('12345');
    await page.getByRole('button', { name: 'Log in' }).click();

    // Should show success notification
    await expect(page.getByText('Successfully signed in!')).toBeVisible();
    // Should redirect to home page after successful sign in
    await expect(page).toHaveURL('/');
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.getByLabel('Email').fill('invalid@test.com');
    await page.getByLabel('Password').fill('wrongpassword');
    await page.getByRole('button', { name: 'Log in' }).click();

    // Should show error notification
    await expect(page.getByText('Failed to sign in')).toBeVisible();
    // Should remain on sign in page
    await expect(page).toHaveURL('/sign-in');
  });

  test('should show validation errors for invalid email format', async ({
    page,
  }) => {
    await page.getByLabel('Email').fill('invalid-email');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page.getByText('Please enter a valid email')).toBeVisible();
  });

  test('should disable submit button while signing in', async ({ page }) => {
    // Mock the api call before navigating
    await page.route('/api/auth/access-tokens', async (route) => {
      const json = {
        user: {
          id: '123',
          email: 'test@test.com',
        },
      };
      await new Promise((resolve) => setTimeout(resolve, 500));
      await route.fulfill({ json });
    });

    await page.getByLabel('Email').fill('test@test.com');
    await page.getByLabel('Password').fill('12345');
    const submitButton = page.getByRole('button', { name: 'Log in' });
    await submitButton.click();

    // Button should be disabled during submission
    await expect(submitButton).toBeDisabled();
  });
});
