import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { SignInFormData } from '../../organisms/SignInForm';
import SignInPage from './SignInPage';

const defaultValues: SignInFormData = {
  username: 'user@example.com',
  password: 'password123',
};

describe('SignInPage', () => {
  it('renders the welcome message and form', () => {
    render(
      <SignInPage
        defaultValues={defaultValues}
        onSubmit={vi.fn()}
        isPending={false}
      />,
    );
    expect(screen.getByText('Welcome!')).toBeInTheDocument();
    expect(screen.getByText('Sign in to continue.')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument();
  });

  it('passes defaultValues to the form', () => {
    render(
      <SignInPage
        defaultValues={defaultValues}
        onSubmit={vi.fn()}
        isPending={false}
      />,
    );
    expect(screen.getByDisplayValue('user@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('password123')).toBeInTheDocument();
  });

  it('calls onSubmit with form data when submitted', async () => {
    const onSubmit = vi.fn();
    render(
      <SignInPage
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        isPending={false}
      />,
    );
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@site.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'newpass' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Log in' }));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        { username: 'test@site.com', password: 'newpass' },
        expect.any(Object),
      );
    });
  });

  it('disables the submit button when isPending is true', () => {
    render(
      <SignInPage
        defaultValues={defaultValues}
        onSubmit={vi.fn()}
        isPending={true}
      />,
    );
    expect(screen.getByRole('button', { name: 'Log in' })).toBeDisabled();
  });

  it('enables the submit button when isPending is false', () => {
    render(
      <SignInPage
        defaultValues={defaultValues}
        onSubmit={vi.fn()}
        isPending={false}
      />,
    );
    expect(screen.getByRole('button', { name: 'Log in' })).not.toBeDisabled();
  });
});
