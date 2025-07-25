import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRoutesStub } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthStateProvider } from '../../../auth-state';
import { useNotification } from '../../../notification';
import { signInMutation } from '../../api';

import { NotificationProvider } from '../../../notification/NotificationProvider';
import { AuthHandlerProvider } from '../../../templates/AuthHandler';
import SignInPageContainer from './SignInPageContainer';

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

const renderWithProviders = (Component: React.ComponentType) => {
  const queryClient = new QueryClient();
  const Stub = createRoutesStub([
    {
      path: '*',
      Component: () => (
        <AuthHandlerProvider>
          <Component />
        </AuthHandlerProvider>
      ),
    },
  ]);
  return render(
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <AuthStateProvider>
          <Stub initialEntries={['/']} />
        </AuthStateProvider>
      </NotificationProvider>
    </QueryClientProvider>,
  );
};

describe('SignInPageContainer', () => {
  const email = 'test@site.com';
  const password = 'newpass';
  const signInMutationMock = vi.mocked(signInMutation);
  const useNotificationMock = vi.mocked(useNotification);
  const showSuccessMock = vi.fn();
  const showErrorMock = vi.fn();
  useNotificationMock.mockReturnValue({
    showSuccess: showSuccessMock,
    showError: showErrorMock,
    showInfo: vi.fn(),
    showWarning: vi.fn(),
  });

  beforeEach(() => {
    signInMutationMock.mockReset();
    showSuccessMock.mockReset();
    showErrorMock.mockReset();
  });

  it('calls signInMutation and shows success notification on successful sign in', async () => {
    signInMutationMock.mockResolvedValueOnce({ user: { id: '1', email: email } });

    renderWithProviders(SignInPageContainer);
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: email } });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: password },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Log in' }));

    await waitFor(() => {
      expect(signInMutationMock).toHaveBeenCalledWith({
        username: email,
        password: password,
      });
      expect(showSuccessMock).toHaveBeenCalledWith('Successfully signed in!');
    });
  });

  it('shows error notification on failed sign in', async () => {
    signInMutationMock.mockRejectedValueOnce(new Error('Invalid credentials'));

    renderWithProviders(SignInPageContainer);
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
