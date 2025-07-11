import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import type { SignInFormData } from './SignInForm';
import SignInForm from './SignInForm';

const meta = {
  component: SignInForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValues: {
      description: 'Default form values for username and password',
      control: 'object',
    },
    onSubmit: {
      description: 'Function called when the form is submitted',
      control: false,
    },
    isSubmitting: {
      description: 'Whether the form is currently submitting',
      control: 'boolean',
    },
  },
} satisfies Meta<typeof SignInForm>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultFormData: SignInFormData = {
  username: '',
  password: '',
};

export const Default: Story = {
  args: {
    defaultValues: defaultFormData,
    onSubmit: fn(),
    isSubmitting: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the default sign-in form with empty fields.',
      },
    },
  },
};

export const Submitting: Story = {
  args: {
    defaultValues: {
      username: 'invalid-email',
      password: '',
    },
    onSubmit: fn(),
    isSubmitting: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the sign-in form when submitting.',
      },
    },
  },
};
