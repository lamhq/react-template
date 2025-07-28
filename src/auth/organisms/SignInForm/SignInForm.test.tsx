import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SignInForm from './SignInForm';

describe('SignInForm', () => {
  const defaultProps = {
    defaultValues: {
      username: '',
      password: '',
    },
    onSubmit: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders form with all required elements', () => {
      render(<SignInForm {...defaultProps} />);

      expect(screen.getByRole('form')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument();
    });

    it('renders with correct default values', () => {
      const customDefaultValues = {
        username: 'test@example.com',
        password: 'testpassword',
      };
      render(<SignInForm {...defaultProps} defaultValues={customDefaultValues} />);

      expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
      expect(screen.getByDisplayValue('testpassword')).toBeInTheDocument();
    });

    it('renders email input with correct attributes', () => {
      render(<SignInForm {...defaultProps} />);
      const emailInput = screen.getByLabelText('Email');

      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('placeholder', 'johndoe@email.com');
      expect(emailInput).toHaveAttribute('autoComplete', 'email');
      expect(emailInput).toHaveAttribute('required');
    });

    it('renders password input with correct attributes', () => {
      render(<SignInForm {...defaultProps} />);
      const passwordInput = screen.getByLabelText('Password');

      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(passwordInput).toHaveAttribute('placeholder', 'password');
      expect(passwordInput).toHaveAttribute('autoComplete', 'current-password');
      expect(passwordInput).toHaveAttribute('required');
    });

    it('renders submit button with correct text', () => {
      render(<SignInForm {...defaultProps} />);
      const submitButton = screen.getByRole('button', { name: 'Log in' });

      expect(submitButton).toHaveAttribute('type', 'submit');
    });
  });

  describe('Form validation', () => {
    it('shows error for empty email on submit', async () => {
      render(<SignInForm {...defaultProps} />);

      const submitButton = screen.getByRole('button', { name: 'Log in' });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Please enter your email')).toBeInTheDocument();
      });
    });

    it('shows error for empty password on submit', async () => {
      render(<SignInForm {...defaultProps} />);

      const emailInput = screen.getByLabelText('Email');
      const submitButton = screen.getByRole('button', { name: 'Log in' });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Please enter your password')).toBeInTheDocument();
      });
    });

    it('shows error for invalid email format', async () => {
      render(<SignInForm {...defaultProps} />);

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: 'Log in' });

      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
      });
    });

    it('clears email error when valid email is entered', async () => {
      render(<SignInForm {...defaultProps} />);

      const emailInput = screen.getByLabelText('Email');
      const submitButton = screen.getByRole('button', { name: 'Log in' });

      // First, trigger error
      fireEvent.click(submitButton);
      await waitFor(() => {
        expect(screen.getByText('Please enter your email')).toBeInTheDocument();
      });

      // Then enter valid email
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.blur(emailInput);

      await waitFor(() => {
        expect(
          screen.queryByText('Please enter your email'),
        ).not.toBeInTheDocument();
      });
    });

    it('clears password error when password is entered', async () => {
      render(<SignInForm {...defaultProps} />);

      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: 'Log in' });

      // First, trigger error
      fireEvent.click(submitButton);
      await waitFor(() => {
        expect(screen.getByText('Please enter your password')).toBeInTheDocument();
      });

      // Then enter password
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.blur(passwordInput);

      await waitFor(() => {
        expect(
          screen.queryByText('Please enter your password'),
        ).not.toBeInTheDocument();
      });
    });
  });

  describe('Form submission', () => {
    it('calls onSubmit with form data when valid', async () => {
      const onSubmit = vi.fn();
      render(<SignInForm {...defaultProps} onSubmit={onSubmit} />);

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: 'Log in' });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
      });
      expect(onSubmit).toHaveBeenCalledWith(
        {
          username: 'test@example.com',
          password: 'password123',
        },
        expect.any(Object),
      );
    });

    it('does not call onSubmit when form is invalid', async () => {
      const onSubmit = vi.fn();
      render(<SignInForm {...defaultProps} onSubmit={onSubmit} />);

      const submitButton = screen.getByRole('button', { name: 'Log in' });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(onSubmit).not.toHaveBeenCalled();
      });
    });
  });

  describe('Loading state', () => {
    it('shows loading state when isSubmitting is true', () => {
      render(<SignInForm {...defaultProps} isSubmitting={true} />);
      const submitButton = screen.getByRole('button', { name: 'Log in' });

      expect(submitButton).toBeDisabled();
    });

    it('does not show loading state when isSubmitting is false', () => {
      render(<SignInForm {...defaultProps} isSubmitting={false} />);
      const submitButton = screen.getByRole('button', { name: 'Log in' });

      expect(submitButton).not.toBeDisabled();
    });

    it('defaults to not loading when isSubmitting is not provided', () => {
      render(<SignInForm {...defaultProps} />);
      const submitButton = screen.getByRole('button', { name: 'Log in' });

      expect(submitButton).not.toBeDisabled();
    });
  });

  describe('User interactions', () => {
    it('allows typing in email field', () => {
      render(<SignInForm {...defaultProps} />);

      const emailInput = screen.getByLabelText('Email');
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

      expect(emailInput).toHaveValue('test@example.com');
    });

    it('allows typing in password field', () => {
      render(<SignInForm {...defaultProps} />);

      const passwordInput = screen.getByLabelText('Password');
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      expect(passwordInput).toHaveValue('password123');
    });

    it('allows clearing and retyping in fields', () => {
      render(<SignInForm {...defaultProps} />);

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');

      // Type initial values
      fireEvent.change(emailInput, { target: { value: 'old@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'oldpassword' } });

      // Clear and retype
      fireEvent.change(emailInput, { target: { value: '' } });
      fireEvent.change(passwordInput, { target: { value: '' } });
      fireEvent.change(emailInput, { target: { value: 'new@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'newpassword' } });

      expect(emailInput).toHaveValue('new@example.com');
      expect(passwordInput).toHaveValue('newpassword');
    });
  });
});
