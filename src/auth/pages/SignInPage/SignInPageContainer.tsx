import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import type { SubmitHandler } from 'react-hook-form';

import { useSignIn } from '../../../auth-state';
import { useNotification } from '../../../notification';
import { signInMutation, type SignInResponse } from '../../api';
import type { SignInFormData } from '../../organisms/SignInForm';
import type { User } from '../../types';
import SignInPage from './SignInPage';

const defaultValues: SignInFormData = {
  username: 'test@test.com',
  password: '12345',
};

export default function SignInPageContainer() {
  const { showSuccess, showError } = useNotification();
  const signIn = useSignIn<User>();

  const { mutate: getAccessToken, isPending } = useMutation<
    SignInResponse,
    Error,
    SignInFormData
  >({
    mutationFn: signInMutation,
    onSuccess: (data) => {
      showSuccess('Successfully signed in!');
      signIn(data);
    },
    onError: (error: Error) => {
      showError(error.message);
    },
  });

  const handleSubmit: SubmitHandler<SignInFormData> = useCallback(
    (data) => {
      getAccessToken(data);
    },
    [getAccessToken],
  );

  return (
    <SignInPage
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      isPending={isPending}
    />
  );
}
