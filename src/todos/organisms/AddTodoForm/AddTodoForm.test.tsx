import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useAtomValue } from 'jotai';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useNotification } from '../../../notification';
import type { Todo } from '../../api';
import { createTodo } from '../../api';
import AddTodoForm from './AddTodoForm';

// Mock useAtomValue
vi.mock('jotai', async (importOriginal) => {
  const originalModule = await importOriginal();
  return Object.assign({}, originalModule, {
    useAtomValue: vi.fn(),
  });
});

// Mock createTodo API
vi.mock('../../api', () => ({
  createTodo: vi.fn(),
}));

// Mock useNotification
vi.mock('../../../notification', () => ({
  useNotification: vi.fn(),
}));

// Helper to render with providers
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

describe('AddTodoForm', () => {
  let queryClient: QueryClient;
  const createTodoMock = createTodo as unknown as ReturnType<typeof vi.fn>;
  const useAtomValueMock = useAtomValue as unknown as ReturnType<typeof vi.fn>;
  const useNotificationMock = useNotification as unknown as ReturnType<typeof vi.fn>;
  const showErrorMock = vi.fn();

  beforeEach(() => {
    queryClient = new QueryClient();
    vi.clearAllMocks();
    useAtomValueMock.mockReturnValue(1);
    useNotificationMock.mockReturnValue({
      showError: showErrorMock,
    });
  });

  it('renders input and button', () => {
    renderWithProviders(<AddTodoForm />, { queryClient });

    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });

  it('calls createTodo when submit button is clicked', async () => {
    createTodoMock.mockResolvedValue({
      id: '1',
      title: 'Test Todo',
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    renderWithProviders(<AddTodoForm />, { queryClient });
    fireEvent.change(screen.getByPlaceholderText('Title'), {
      target: { value: 'Test Todo' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));

    await waitFor(() => {
      expect(createTodoMock).toHaveBeenCalledWith({
        title: 'Test Todo',
        status: 'pending',
      });
    });
  });

  it('does not submit if input is empty', async () => {
    renderWithProviders(<AddTodoForm />, { queryClient });

    fireEvent.change(screen.getByPlaceholderText('Title'), {
      target: { value: '   ' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));

    await waitFor(() => {
      expect(createTodoMock).not.toHaveBeenCalled();
    });
  });

  it('shows error notification on error', async () => {
    createTodoMock.mockRejectedValue(new Error('Failed to create'));

    renderWithProviders(<AddTodoForm />, { queryClient });
    fireEvent.change(screen.getByPlaceholderText('Title'), {
      target: { value: 'Error Todo' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));

    await waitFor(() => {
      expect(showErrorMock).toHaveBeenCalledWith('Failed to create');
    });
  });

  it('optimistically updates the cache', async () => {
    useAtomValueMock.mockReturnValue(1);
    // Set up initial cache
    queryClient.setQueryData(
      ['todos', 1],
      [
        [
          {
            id: 'a',
            title: 'Old',
            status: 'pending',
            createdAt: '',
            updatedAt: '',
          } as Todo,
        ],
        1,
      ],
    );
    createTodoMock.mockResolvedValue({
      id: '2',
      title: 'Optimistic',
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    renderWithProviders(<AddTodoForm />, { queryClient });
    fireEvent.change(screen.getByPlaceholderText('Title'), {
      target: { value: 'Optimistic' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));

    // Optimistic update: temp todo should be in cache
    await waitFor(() => {
      const [todos] = queryClient.getQueryData(['todos', 1]) as [Todo[], number];
      expect(todos[0].title).toBe('Optimistic');
    });
    // After mutation resolves, temp todo replaced by real one
    await waitFor(() => {
      const [todos] = queryClient.getQueryData(['todos', 1]) as [Todo[], number];
      expect(todos[0].id).toBe('2');
    });
  });
});
