import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { ApiError } from '../../types';
import { isApiError } from '../../utils';
import ErrorFallback from './ErrorFallback';

// Mock isApiError from ../../utils
vi.mock('../../utils', async (importOriginal) => {
  const originalModule = await importOriginal();
  return Object.assign({}, originalModule, {
    isApiError: vi.fn(),
  });
});

// Helper to create ApiError with status
function createApiError(status?: number): ApiError {
  return {
    message: 'error',
    request: {},
    response: status !== undefined ? { status } : undefined,
  };
}

describe('ErrorFallback', () => {
  const resetErrorBoundary = vi.fn();
  const isApiErrorMock = isApiError as unknown as ReturnType<typeof vi.fn>;

  afterEach(() => {
    isApiErrorMock.mockReset();
    resetErrorBoundary.mockReset();
  });

  it('renders default error message and icon for non-ApiError', () => {
    isApiErrorMock.mockReturnValue(false);
    render(
      <ErrorFallback
        error={new Error('fail')}
        resetErrorBoundary={resetErrorBoundary}
      />,
    );
    expect(screen.getByText('An error occurred in the app.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
  });

  it('renders network error message and icon for status 0', () => {
    isApiErrorMock.mockReturnValue(true);
    const error = createApiError(0);
    render(<ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />);
    expect(
      screen.getByText('Please check your network connection.'),
    ).toBeInTheDocument();
  });

  it('renders 404 error message and icon', () => {
    isApiErrorMock.mockReturnValue(true);
    const error = createApiError(404);
    render(<ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />);
    expect(screen.getByText('Resource not found.')).toBeInTheDocument();
  });

  it('renders 403 error message and icon', () => {
    isApiErrorMock.mockReturnValue(true);
    const error = createApiError(403);
    render(<ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />);
    expect(
      screen.getByText("You're not allowed to access this section."),
    ).toBeInTheDocument();
  });

  it('renders 500 error message and icon', () => {
    isApiErrorMock.mockReturnValue(true);
    const error = createApiError(500);
    render(<ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />);
    expect(
      screen.getByText('Our server has an error. Please try again later.'),
    ).toBeInTheDocument();
  });

  it('renders default message for unknown ApiError status', () => {
    isApiErrorMock.mockReturnValue(true);
    const error = createApiError(123);
    render(<ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />);
    expect(screen.getByText('An error occurred in the app.')).toBeInTheDocument();
  });

  it('calls resetErrorBoundary when Try again is clicked', () => {
    isApiErrorMock.mockReturnValue(false);
    render(
      <ErrorFallback
        error={new Error('fail')}
        resetErrorBoundary={resetErrorBoundary}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(resetErrorBoundary).toHaveBeenCalled();
  });
});
