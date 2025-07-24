import { ON_AUTH_REQUIRED } from '../auth-state';
import type { ApiError } from './types';

export function isApiError(error: unknown): error is ApiError {
  return typeof error === 'object' && error !== null && 'request' in error;
}

export function isUnauthenticatedError(error: unknown): error is ApiError {
  return isApiError(error) && error.response?.status === 401;
}

export async function withErrorHandling<T>(
  apiCall: () => Promise<T>,
  defaultMessage: string,
): Promise<T> {
  try {
    return await apiCall();
  } catch (error) {
    console.error(error);

    if (isUnauthenticatedError(error)) {
      window.dispatchEvent(new CustomEvent(ON_AUTH_REQUIRED));
    }

    let errorMessage = defaultMessage;
    if (isApiError(error) && error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }

    throw new Error(errorMessage);
  }
}
