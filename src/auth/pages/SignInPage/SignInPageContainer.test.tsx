import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ConfirmProvider from '../../../confirm/templates/ConfirmProvider';
import { NotificationProvider } from '../../../notification/NotificationProvider';
import { LayoutProvider } from '../../../templates/MainLayout/Provider';
import RouterAuthProvider from '../../../templates/RouterAuthProvider';
import SignInPageContainer from './SignInPageContainer';

import { useSignIn } from '../../../auth-state';
import { useNotification } from '../../../notification';
import { signInMutation } from '../../api';

// Mock signInMutation
vi.mock('../../api', async (importOriginal) => {
  const originalModule = await importOriginal();
  return Object.assign({}, originalModule, {
    signInMutation: vi.fn(),
  });
});

// Mock useNotification
vi.mock('../../../notification', async (importOriginal) => {
  const originalModule = await importOriginal();
  return Object.assign({}, originalModule, {
    useNotification: vi.fn(),
  });
});

// Mock useSignIn
vi.mock('../../../auth-state', async (importOriginal) => {
  const originalModule = await importOriginal();
  return Object.assign({}, originalModule, {
    useSignIn: vi.fn(),
  });
});

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <RouterAuthProvider>
          <LayoutProvider>
            <ConfirmProvider>{ui}</ConfirmProvider>
          </LayoutProvider>
        </RouterAuthProvider>
      </NotificationProvider>
    </QueryClientProvider>,
  );
};

describe('SignInPageContainer', () => {
  const email = 'test@site.com';
  const password = 'newpass';
  const signInMutationMock = signInMutation as unknown as ReturnType<typeof vi.fn>;
  const useNotificationMock = useNotification as unknown as ReturnType<typeof vi.fn>;
  const showSuccessMock = vi.fn();
  const showErrorMock = vi.fn();
  const useSignInMock = useSignIn as unknown as ReturnType<typeof vi.fn>;
  const signInMock = vi.fn();

  beforeEach(() => {
    signInMutationMock.mockReset();

    showSuccessMock.mockReset();
    showErrorMock.mockReset();
    useNotificationMock.mockReturnValue({
      showSuccess: showSuccessMock,
      showError: showErrorMock,
    });

    signInMock.mockReset();
    useSignInMock.mockReturnValue(signInMock);
  });

  it('calls signIn and shows success notification on successful sign in', async () => {
    signInMutationMock.mockResolvedValueOnce({ user: { id: 1, username: email } });

    renderWithProviders(<SignInPageContainer />);
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: email } });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: password },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Log in' }));

    await waitFor(() => {
      expect(signInMock).toHaveBeenCalledWith({ user: { id: 1, username: email } });
      expect(showSuccessMock).toHaveBeenCalledWith('Successfully signed in!');
    });
  });

  it('shows error notification on failed sign in', async () => {
    signInMutationMock.mockRejectedValueOnce(new Error('Invalid credentials'));

    renderWithProviders(<SignInPageContainer />);
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: email } });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: password },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Log in' }));

    await waitFor(() => {
      expect(showErrorMock).toHaveBeenCalledWith('Invalid credentials');
    });
  });
});
