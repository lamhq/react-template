import axios from 'axios';

export type ApiError = {
  message: string;
};

export function isApiError(error: unknown): error is ApiError {
  return typeof error === 'object' && error !== null && 'message' in error;
}

export async function withErrorHandling<T>(
  apiCall: () => Promise<T>,
  errorMessage: string,
): Promise<T> {
  try {
    return await apiCall();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        // clear authentication state when response status code is 401
        window.dispatchEvent(new CustomEvent('auth:signout', { bubbles: false }));
      }
    }
    console.error(error);
    throw new Error(errorMessage);
  }
}
