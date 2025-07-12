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
    isLoading: {
      description: 'Whether the todos are currently loading',
    },
    isFetching: {
      description: 'Whether the todos are being fetched (for background updates)',
    },
    page: {
      description: 'Current page number for pagination',
    },
    pageCount: {
      description: 'Total number of pages available',
    },
    onPageChange: {
      description: 'Callback function when page changes',
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
  {
    id: '5',
    title: 'Deploy to production',
    description: 'Deploy the latest version to production environment',
    status: 'completed',
    createdAt: '2024-01-01T08:00:00Z',
    updatedAt: '2024-01-01T17:00:00Z',
  },
];

export const Default: Story = {
  args: {
    todos: mockTodos,
    isLoading: false,
    isFetching: false,
    page: 1,
    pageCount: 1,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default TodoList component displaying a mix of todos with different statuses. Each todo shows a checkbox, title, and delete button. No pagination is shown when pageCount is 1.',
      },
    },
  },
};

export const Empty: Story = {
  args: {
    todos: [],
    isLoading: false,
    isFetching: false,
    page: 1,
    pageCount: 1,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
  parameters: {
    docs: {
      description: {
        story: 'TodoList component with no todos - displays an empty state message.',
      },
    },
  },
};

export const Loading: Story = {
  args: {
    todos: [],
    isLoading: true,
    isFetching: false,
    page: 1,
    pageCount: 1,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
  parameters: {
    docs: {
      description: {
        story: 'TodoList component in loading state - shows a loading fallback.',
      },
    },
  },
};

export const Fetching: Story = {
  args: {
    todos: mockTodos,
    isLoading: false,
    isFetching: true,
    page: 1,
    pageCount: 1,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
  parameters: {
    docs: {
      description: {
        story:
          'TodoList component while fetching - shows blurred content to indicate background updates.',
      },
    },
  },
};

export const WithPagination: Story = {
  args: {
    todos: mockTodos,
    isLoading: false,
    isFetching: false,
    page: 2,
    pageCount: 5,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
  parameters: {
    docs: {
      description: {
        story:
          'TodoList component with pagination - shows pagination controls when pageCount is greater than 1.',
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
    isLoading: false,
    isFetching: false,
    page: 1,
    pageCount: 1,
    onPageChange: (page) => console.log('Page changed to:', page),
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
