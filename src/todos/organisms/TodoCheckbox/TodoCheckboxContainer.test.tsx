import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useAtomValue } from 'jotai';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NotificationProvider } from '../../../notification';
import { updateTodo, type Todo } from '../../api';
import { TODO_QUERY_KEY } from '../../constants';
import TodoCheckboxContainer from './TodoCheckboxContainer';

// Mock useAtomValue
vi.mock('jotai', async (importOriginal) => {
  const originalModule = await importOriginal();
  return Object.assign({}, originalModule, {
    useAtomValue: vi.fn(),
  });
});

// Mock updateTodo API
vi.mock('../../api', () => ({
  updateTodo: vi.fn(),
}));

function renderWithProviders(
  ui: React.ReactElement,
  { queryClient }: { queryClient?: QueryClient } = {},
) {
  return render(
    <QueryClientProvider client={queryClient || new QueryClient()}>
      <NotificationProvider>{ui}</NotificationProvider>
    </QueryClientProvider>,
  );
}

describe('TodoCheckboxContainer', () => {
  let queryClient: QueryClient;
  const updateTodoMock = vi.mocked(updateTodo);
  const useAtomValueMock = vi.mocked(useAtomValue);
  const todo: Todo = {
    id: '1',
    title: 'Test Todo',
    status: 'pending',
    createdAt: '',
    updatedAt: '',
  };

  beforeEach(() => {
    queryClient = new QueryClient();
    vi.clearAllMocks();
    useAtomValueMock.mockReturnValue(1);
  });

  it('renders checkbox', () => {
    renderWithProviders(<TodoCheckboxContainer todo={todo} />, { queryClient });
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('optimistically updates todo status on check', async () => {
    updateTodoMock.mockResolvedValue({ ...todo, status: 'completed' });
    // Set up initial cache
    queryClient.setQueryData([TODO_QUERY_KEY, 1], [[{ ...todo }], 1]);

    renderWithProviders(<TodoCheckboxContainer todo={todo} />, { queryClient });
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    await waitFor(() => {
      const [todos] = queryClient.getQueryData([TODO_QUERY_KEY, 1]) as [
        Todo[],
        number,
      ];
      expect(todos.find((t) => t.id === '1')?.status).toBe('completed');
    });
  });

  it('rolls back on error', async () => {
    updateTodoMock.mockRejectedValue(new Error('Failed to update'));
    // Set up initial cache
    queryClient.setQueryData([TODO_QUERY_KEY, 1], [[{ ...todo }], 1]);

    renderWithProviders(<TodoCheckboxContainer todo={todo} />, { queryClient });
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    await waitFor(() => {
      const [todos] = queryClient.getQueryData([TODO_QUERY_KEY, 1]) as [
        Todo[],
        number,
      ];
      // Should roll back to previous status
      expect(todos.find((t) => t.id === '1')?.status).toBe('pending');
    });
  });

  it('disables checkbox while mutation is pending', async () => {
    let resolve: (v: Todo) => void;
    updateTodoMock.mockImplementation(
      () =>
        new Promise<Todo>((r) => {
          resolve = r;
        }),
    );
    renderWithProviders(<TodoCheckboxContainer todo={todo} />, { queryClient });
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    await waitFor(() => {
      expect(checkbox).toBeDisabled();
    });

    // Finish mutation
    resolve!({ ...todo, status: 'completed' });
    await waitFor(() => {
      expect(checkbox).not.toBeDisabled();
    });
  });
});
