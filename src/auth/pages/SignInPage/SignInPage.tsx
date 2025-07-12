import type { SubmitHandler } from 'react-hook-form';

import { Sheet, Typography } from '@mui/joy';
import SignInForm, { type SignInFormData } from '../../organisms/SignInForm';

export type SignInPageProps = {
  defaultValues: SignInFormData;
  onSubmit: SubmitHandler<SignInFormData>;
  isPending: boolean;
};

export default function SignInPage({
  defaultValues,
  onSubmit,
  isPending,
}: SignInPageProps) {
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
        onSubmit={onSubmit}
        isSubmitting={isPending}
      />
    </Sheet>
  );
}
