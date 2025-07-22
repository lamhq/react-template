import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useAtomValue } from 'jotai';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useConfirm } from '../../../confirm';
import { useNotification } from '../../../notification';
import { deleteTodo, type Todo } from '../../api';
import { TODO_QUERY_KEY } from '../../constants';
import DeleteTodoBtnContainer from './DeleteTodoBtnContainer';

// Mock useAtomValue
vi.mock('jotai', async (importOriginal) => {
  const originalModule = await importOriginal();
  return Object.assign({}, originalModule, {
    useAtomValue: vi.fn(),
  });
});

// Mock deleteTodo API
vi.mock('../../api', () => ({
  deleteTodo: vi.fn(),
}));

// Mock useNotification
vi.mock('../../../notification', () => ({
  useNotification: vi.fn(),
}));

// Mock useConfirm
vi.mock('../../../confirm', () => ({
  useConfirm: vi.fn(),
}));

function renderWithProviders(
  ui: React.ReactElement,
  { queryClient }: { queryClient?: QueryClient } = {},
) {
  return render(
    <QueryClientProvider client={queryClient || new QueryClient()}>
      {ui}
    </QueryClientProvider>,
  );
}

describe('DeleteTodoBtnContainer', () => {
  let queryClient: QueryClient;
  const deleteTodoMock = vi.mocked(deleteTodo);
  const useAtomValueMock = vi.mocked(useAtomValue);
  const useNotificationMock = vi.mocked(useNotification);
  const useConfirmMock = vi.mocked(useConfirm);
  const showErrorMock = vi.fn();
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
    useNotificationMock.mockReturnValue({
      showSuccess: vi.fn(),
      showError: showErrorMock,
      showInfo: vi.fn(),
      showWarning: vi.fn(),
    });
  });

  it('renders delete button', () => {
    useConfirmMock.mockReturnValue(() => Promise.resolve(false));

    renderWithProviders(<DeleteTodoBtnContainer todo={todo} />, { queryClient });

    expect(screen.getByTitle('Delete todo')).toBeInTheDocument();
  });

  it('shows confirm dialog and deletes on confirm', async () => {
    useConfirmMock.mockReturnValue(() => Promise.resolve(true));
    deleteTodoMock.mockResolvedValue();
    // Set up initial cache
    queryClient.setQueryData([TODO_QUERY_KEY, 1], [[{ ...todo }], 1]);
    renderWithProviders(<DeleteTodoBtnContainer todo={todo} />, { queryClient });
    fireEvent.click(screen.getByTitle('Delete todo'));
    await waitFor(() => {
      expect(deleteTodoMock).toHaveBeenCalledWith('1');
    });
    // Optimistic update: todo should be removed from cache
    await waitFor(() => {
      const [todos] = queryClient.getQueryData([TODO_QUERY_KEY, 1]) as [
        Todo[],
        number,
      ];
      expect(todos.find((t) => t.id === '1')).toBeUndefined();
    });
  });

  it('does not delete if not confirmed', async () => {
    useConfirmMock.mockReturnValue(() => Promise.resolve(false));
    renderWithProviders(<DeleteTodoBtnContainer todo={todo} />, { queryClient });
    fireEvent.click(screen.getByTitle('Delete todo'));
    await waitFor(() => {
      expect(deleteTodoMock).not.toHaveBeenCalled();
    });
  });

  it('shows error and rolls back on error', async () => {
    useConfirmMock.mockReturnValue(() => Promise.resolve(true));
    deleteTodoMock.mockRejectedValue(new Error('Failed to delete'));
    // Set up initial cache
    queryClient.setQueryData([TODO_QUERY_KEY, 1], [[{ ...todo }], 1]);
    renderWithProviders(<DeleteTodoBtnContainer todo={todo} />, { queryClient });
    fireEvent.click(screen.getByTitle('Delete todo'));
    await waitFor(() => {
      expect(showErrorMock).toHaveBeenCalledWith('Failed to delete');
      // Should roll back to previous todos
      const [todos] = queryClient.getQueryData([TODO_QUERY_KEY, 1]) as [
        Todo[],
        number,
      ];
      expect(todos.find((t) => t.id === '1')).toBeDefined();
    });
  });
});
