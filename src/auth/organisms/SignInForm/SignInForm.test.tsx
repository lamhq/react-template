import { jest } from '@jest/globals';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import SignInForm from './SignInForm';

describe('SignInForm', () => {
  const defaultValues = { username: '', password: '' };
  const onSubmit = jest.fn();

  it('renders form fields and submit button', () => {
    render(<SignInForm defaultValues={defaultValues} onSubmit={onSubmit} />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    render(<SignInForm defaultValues={defaultValues} onSubmit={onSubmit} />);
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    await waitFor(() => {
      expect(screen.getByText(/please enter your email/i)).toBeInTheDocument();
      expect(screen.getByText(/please enter your password/i)).toBeInTheDocument();
    });
  });

  it('calls `onSubmit` with form data', async () => {
    render(<SignInForm defaultValues={defaultValues} onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'secret' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        { username: 'user@example.com', password: 'secret' },
        expect.anything(),
      );
    });
  });
});
