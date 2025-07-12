import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { Todo } from '../../api';

import { NotificationProvider } from '../../../notification/NotificationProvider';
import TodoList from './TodoList';

const queryClient = new QueryClient();

const meta = {
  component: TodoList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    todos: {
      description: 'Array of todo items to display in the list',
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <Story />
        </NotificationProvider>
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof TodoList>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockTodos: Todo[] = [
  {
    id: '1',
    title: 'Buy groceries',
    description: 'Milk, bread, eggs, and vegetables',
    status: 'pending',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z',
  },
  {
    id: '2',
    title: 'Write documentation',
    description: 'Update API documentation for the new endpoints',
    status: 'in_progress',
    createdAt: '2024-01-01T11:00:00Z',
    updatedAt: '2024-01-01T14:30:00Z',
  },
  {
    id: '3',
    title: 'Review pull requests',
    description: 'Review and approve pending PRs in the repository',
    status: 'completed',
    createdAt: '2024-01-01T09:00:00Z',
    updatedAt: '2024-01-01T16:00:00Z',
  },
  {
    id: '4',
    title: 'Plan team meeting',
    description: 'Schedule and prepare agenda for weekly team meeting',
    status: 'pending',
    createdAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-01T12:00:00Z',
  },
];

export const Default: Story = {
  args: {
    todos: mockTodos,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default TodoList component displaying a mix of todos with different statuses. Each todo shows a checkbox, title, and delete button.',
      },
    },
  },
};

export const Empty: Story = {
  args: {
    todos: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'TodoList component with no todos - displays an empty list.',
      },
    },
  },
};

export const AllPending: Story = {
  args: {
    todos: mockTodos.filter((todo) => todo.status === 'pending'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'TodoList showing only pending todos - all items are unchecked and have normal text styling.',
      },
    },
  },
};

export const AllCompleted: Story = {
  args: {
    todos: mockTodos.filter((todo) => todo.status === 'completed'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'TodoList showing only completed todos - all items are checked and have strikethrough text styling.',
      },
    },
  },
};

export const InProgress: Story = {
  args: {
    todos: mockTodos.filter((todo) => todo.status === 'in_progress'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'TodoList showing only in-progress todos - items are partially completed.',
      },
    },
  },
};

export const LongTitles: Story = {
  args: {
    todos: [
      {
        id: '1',
        title:
          'This is a very long todo title that might wrap to multiple lines and test the layout behavior of the component',
        description: 'A todo with an extremely long title to test text wrapping',
        status: 'pending',
        createdAt: '2024-01-01T10:00:00Z',
        updatedAt: '2024-01-01T10:00:00Z',
      },
      {
        id: '2',
        title:
          'Another long title that demonstrates how the component handles text overflow and layout',
        description: 'Testing responsive design',
        status: 'completed',
        createdAt: '2024-01-01T11:00:00Z',
        updatedAt: '2024-01-01T11:00:00Z',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'TodoList with long todo titles to demonstrate text wrapping and responsive layout behavior.',
      },
    },
  },
};
