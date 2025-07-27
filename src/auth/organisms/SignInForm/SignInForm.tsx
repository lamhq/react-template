import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

export type SignInFormData = {
  username: string;
  password: string;
};

export type SignInFormProps = {
  defaultValues: SignInFormData;
  onSubmit: SubmitHandler<SignInFormData>;
  isSubmitting?: boolean;
};

const signInFormSchema = yup.object().shape({
  username: yup
    .string()
    .email('Please enter a valid email')
    .required('Please enter your email'),
  password: yup.string().required('Please enter your password'),
});

export default function SignInForm({
  defaultValues,
  onSubmit,
  isSubmitting = false,
}: SignInFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    defaultValues,
    resolver: yupResolver(signInFormSchema),
  });

  return (
    <Box
      component="form"
      role="form"
      onSubmit={(e) => {
        void handleSubmit(onSubmit)(e);
      }}
      noValidate
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <FormControl error={!!errors.username}>
            <FormLabel>Email</FormLabel>
            <Input
              {...field}
              type="email"
              placeholder="johndoe@email.com"
              autoComplete="email"
              autoFocus
              required
            />
            {errors.username && (
              <Typography level="body-xs" color="danger" sx={{ mt: 0.5 }}>
                {errors.username.message}
              </Typography>
            )}
          </FormControl>
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <FormControl error={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              {...field}
              type="password"
              placeholder="password"
              autoComplete="current-password"
              required
            />
            {errors.password && (
              <Typography level="body-xs" color="danger" sx={{ mt: 0.5 }}>
                {errors.password.message}
              </Typography>
            )}
          </FormControl>
        )}
      />

      <Button type="submit" sx={{ mt: 1 }} loading={isSubmitting}>
        Log in
      </Button>
    </Box>
  );
}
