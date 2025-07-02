import axios from 'axios';
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
    throw new Error('Failed to sign in');
  }
}
