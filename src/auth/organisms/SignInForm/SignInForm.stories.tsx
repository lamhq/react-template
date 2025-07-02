import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import SignInForm from './SignInForm';

const meta = {
  title: 'Organisms/SignInForm',
  component: SignInForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    onSubmit: fn(),
    isSubmitting: false,
  },
} satisfies Meta<typeof SignInForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValues: {
      username: 'test@example.com',
      password: 'password123',
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Check that form elements are present
    const emailInput = canvas.getByLabelText(/email/i);
    const passwordInput = canvas.getByLabelText(/password/i);
    const submitButton = canvas.getByRole('button', { name: /log in/i });

    await expect(emailInput).toBeInTheDocument();
    await expect(passwordInput).toBeInTheDocument();
    await expect(submitButton).toBeInTheDocument();

    // Test form submission
    await userEvent.click(submitButton);
    await expect(args.onSubmit).toHaveBeenCalledWith(
      { username: 'test@example.com', password: 'password123' },
      expect.anything(),
    );
  },
};

export const WithValidationErrors: Story = {
  args: {
    defaultValues: {
      username: 'invalid-email',
      password: '',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const submitButton = canvas.getByRole('button', { name: /log in/i });

    // Submit form with invalid data
    await userEvent.click(submitButton);

    // Check for validation error messages
    const emailError = canvas.getByText(/please enter a valid email/i);
    const passwordError = canvas.getByText(/please enter your password/i);

    await expect(emailError).toBeInTheDocument();
    await expect(passwordError).toBeInTheDocument();
  },
};

export const Submitting: Story = {
  args: {
    defaultValues: {
      username: 'test@example.com',
      password: 'password123',
    },
    isSubmitting: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that submit button shows loading state
    const submitButton = canvas.getByRole('button', { name: /log in/i });
    await expect(submitButton).toBeInTheDocument();

    // The button should be disabled or show loading state
    // Note: MUI Joy Button with loading prop shows a spinner
    const loadingSpinner = canvas.getByRole('progressbar');
    await expect(loadingSpinner).toBeInTheDocument();
  },
};
