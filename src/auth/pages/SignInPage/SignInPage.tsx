import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { Sheet, Typography } from '@mui/joy';
import { useSignIn } from '../../../auth-state';
import { useNotification } from '../../../notification';
import { HOME_ROUTE } from '../../../routes';
import { signInMutation, type SignInResponse } from '../../api';
import SignInForm, { type SignInFormData } from '../../organisms/SignInForm';
import type { User } from '../../types';

const defaultValues: SignInFormData = {
  username: 'test@test.com',
  password: '12345',
};

export default function SignInPage() {
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();
  const authenticate = useSignIn<User>();
  const { mutate: signIn, isPending } = useMutation<
    SignInResponse,
    Error,
    SignInFormData
  >({
    mutationFn: signInMutation,
    onSuccess: (data) => {
      showSuccess('Successfully signed in!');
      authenticate(data);
      void navigate(HOME_ROUTE);
    },
    onError: (error: Error) => {
      showError(error.message);
    },
  });

  const handleSubmit: SubmitHandler<SignInFormData> = useCallback(
    (data) => {
      signIn(data);
    },
    [signIn],
  );

  return (
    <Sheet
      variant="outlined"
      sx={{
        width: 300,
        mx: 'auto', // margin left & right
        my: 4, // margin top & bottom
        py: 3, // padding top & bottom
        px: 2, // padding left & right
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRadius: 'sm',
        boxShadow: 'md',
      }}
    >
      <div>
        <Typography level="h4" component="h1">
          <b>Welcome!</b>
        </Typography>
        <Typography level="body-sm">Sign in to continue.</Typography>
      </div>

      <SignInForm
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        isSubmitting={isPending}
      />
    </Sheet>
  );
}
