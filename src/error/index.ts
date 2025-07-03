import { AUTH_UNAUTHENTICATED_EVENT } from '../auth-state';

export type ApiError = {
  message: string;
  response?: {
    status: number;
  };
};

export function isApiError(error: unknown): error is ApiError {
  return typeof error === 'object' && error !== null && 'message' in error;
}

export function isUnauthenticatedError(error: unknown): boolean {
  return isApiError(error) && error.response?.status === 401;
}

export async function withErrorHandling<T>(
  apiCall: () => Promise<T>,
  errorMessage: string,
): Promise<T> {
  try {
    return await apiCall();
  } catch (error) {
    // dispatch event to auth module
    if (isUnauthenticatedError(error)) {
      window.dispatchEvent(new CustomEvent(AUTH_UNAUTHENTICATED_EVENT));
    }

    throw new Error(errorMessage);
  }
}
