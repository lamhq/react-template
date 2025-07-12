import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import DeleteTodoBtn from './DeleteTodoBtn';

const meta = {
  component: DeleteTodoBtn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      description: 'Size of the delete button',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    onDelete: {
      description: 'Callback function when delete button is clicked',
    },
    isPending: {
      description: 'Whether the delete operation is in a pending/loading state',
    },
  },
} satisfies Meta<typeof DeleteTodoBtn>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'sm',
    onDelete: fn(),
    isPending: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default DeleteTodoBtn component. The button is enabled and ready for interaction.',
      },
    },
  },
};

export const Processing: Story = {
  args: {
    size: 'sm',
    onDelete: fn(),
    isPending: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Delete operation is in progress. The button is disabled.',
      },
    },
  },
};
