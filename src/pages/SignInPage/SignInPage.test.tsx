import { jest } from '@jest/globals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { Toaster } from 'react-hot-toast';
import type { NavigateFunction } from 'react-router';
import { MemoryRouter } from 'react-router';
import { HOME_ROUTE } from '../../../routes';
import { signInMutation, type SignInResponse } from '../../api';
import { AuthProvider } from '../../index';
import SignInPage from './SignInPage';

// Mock signInMutation
jest.mock('../../api', () => {
  const actual = jest.requireActual<object>('../../api');
  return {
    ...actual,
    signInMutation: jest.fn<typeof signInMutation>(),
  };
});

// Mock react-router's useNavigate
const mockNavigate = jest.fn<NavigateFunction>();
jest.mock('react-router', () => {
  const actual = jest.requireActual<object>('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock Provider
function MockProvider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <AuthProvider>{children}</AuthProvider>
        <Toaster position="top-center" />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
const mockSignInMutation = signInMutation as jest.Mock<typeof signInMutation>;

describe('SignInPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate.mockClear();
    mockSignInMutation.mockResolvedValue({
      user: {
        id: '1',
        email: 'test@test.com',
      },
    });
  });

  it('renders SignInForm with default values', () => {
    render(
      <MockProvider>
        <SignInPage />
      </MockProvider>,
    );

    expect(screen.getByDisplayValue('test@test.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('12345')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('handles successful sign-in', async () => {
    render(
      <MockProvider>
        <SignInPage />
      </MockProvider>,
    );

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    submitButton.click();

    await waitFor(() => {
      expect(mockSignInMutation).toHaveBeenCalledWith({
        username: 'test@test.com',
        password: '12345',
      });
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(HOME_ROUTE);
      expect(screen.getByText(/Successfully signed in!/i)).toBeInTheDocument();
    });
  });

  it('handles sign-in error', async () => {
    const errorMessage = 'Invalid credentials';
    mockSignInMutation.mockRejectedValue(new Error(errorMessage));

    render(
      <MockProvider>
        <SignInPage />
      </MockProvider>,
    );

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    submitButton.click();

    await waitFor(() => {
      expect(mockSignInMutation).toHaveBeenCalledWith({
        username: 'test@test.com',
        password: '12345',
      });
    });

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('shows loading state during sign-in', async () => {
    // a function that resolves `submitPromise`
    let resolvePromise = (value: SignInResponse) => {
      console.log('resolvePromise', value);
    };
    // A promise returned when submitting the form
    const submitPromise = new Promise<SignInResponse>((resolve) => {
      resolvePromise = resolve;
    });

    mockSignInMutation.mockReturnValue(submitPromise);

    render(
      <MockProvider>
        <SignInPage />
      </MockProvider>,
    );

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    submitButton.click();

    // Check that the button is disabled during loading
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });

    // Resolve the promise
    resolvePromise({
      user: {
        id: '1',
        email: 'test@test.com',
      },
    });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it('calls signInMutation with form data when submitted', async () => {
    render(
      <MockProvider>
        <SignInPage />
      </MockProvider>,
    );

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    submitButton.click();

    await waitFor(() => {
      expect(mockSignInMutation).toHaveBeenCalledTimes(1);
      expect(mockSignInMutation).toHaveBeenCalledWith({
        username: 'test@test.com',
        password: '12345',
      });
    });
  });
});
