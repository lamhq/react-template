import { ON_AUTH_REQUIRED } from '../auth-state';
import type { ApiError } from './types';

export function isApiError(error: unknown): error is ApiError {
  return typeof error === 'object' && error !== null && 'request' in error;
}

function isUnauthenticatedError(error: unknown): boolean {
  return isApiError(error) && error.response?.status === 401;
}

export async function withErrorHandling<T>(
  apiCall: () => Promise<T>,
  defaultMessage: string,
): Promise<T> {
  try {
    return await apiCall();
  } catch (error) {
    if (isApiError(error)) {
      // dispatch event to auth module
      if (isUnauthenticatedError(error)) {
        window.dispatchEvent(new CustomEvent(ON_AUTH_REQUIRED));
      } else {
        throw error;
      }
    }

    throw new Error(defaultMessage);
  }
}
