import axios from 'axios';
import { isUnauthenticatedError } from '../error';
import type { SignInFormData } from './organisms/SignInForm';

export type SignInResponse = {
  user: {
    id: string;
    email: string;
  };
};

export async function signInMutation(data: SignInFormData): Promise<SignInResponse> {
  try {
    const response = await axios.post<SignInResponse>(
      '/api/auth/access-tokens',
      data,
    );

    return response.data;
  } catch (error) {
    console.error(error);
    const message =
      isUnauthenticatedError(error) && error.response?.data?.message
        ? error.response.data.message
        : 'Failed to sign in';
    throw new Error(message);
  }
}
