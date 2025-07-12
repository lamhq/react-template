import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import type { Todo } from '../../api';

import TodoCheckbox from './TodoCheckbox';

const meta = {
  component: TodoCheckbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    todo: {
      description: 'Todo object containing the item data',
    },
    onCheck: {
      description: 'Callback function when checkbox state changes',
    },
    isPending: {
      description: 'Whether the checkbox is in a pending/loading state',
    },
  },
} satisfies Meta<typeof TodoCheckbox>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockTodo: Todo = {
  id: '1',
  title: 'Buy groceries',
  description: 'Milk, bread, eggs, and vegetables',
  status: 'pending',
  createdAt: '2024-01-01T10:00:00Z',
  updatedAt: '2024-01-01T10:00:00Z',
};

export const Default: Story = {
  args: {
    todo: mockTodo,
    onCheck: fn(),
    isPending: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default TodoCheckbox component with a pending todo. The checkbox is unchecked and enabled.',
      },
    },
  },
};

export const Completed: Story = {
  args: {
    todo: {
      ...mockTodo,
      status: 'completed',
    },
    onCheck: fn(),
    isPending: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'TodoCheckbox component with a completed todo. The checkbox is checked and enabled.',
      },
    },
  },
};

export const Processing: Story = {
  args: {
    todo: mockTodo,
    onCheck: fn(),
    isPending: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Todo item is being updated. The checkbox is disabled.',
      },
    },
  },
};
