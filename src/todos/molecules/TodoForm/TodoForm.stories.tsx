import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import TodoForm from './TodoForm';

const meta = {
  component: TodoForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onSubmit: {
      description: 'Callback fired when form is submitted with todo data',
    },
    isPending: {
      control: { type: 'boolean' },
      description: 'Whether the form is in a pending/loading state',
    },
  },
} satisfies Meta<typeof TodoForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: fn(),
    isPending: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default TodoForm component with an input field for the todo title and an Add button. The form automatically clears after submission.',
      },
    },
  },
};

export const Pending: Story = {
  args: {
    onSubmit: fn(),
    isPending: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'TodoForm in pending state - the button shows "Adding..." and is disabled to prevent multiple submissions.',
      },
    },
  },
};
