import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { useAtom } from 'jotai';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getTodos, type Todo } from '../../api';
import TodoList from './TodoList';
import TodoListContainer from './TodoListContainer';

vi.mock('jotai', async (importOriginal) => {
  const originalModule = await importOriginal();
  return Object.assign({}, originalModule, {
    useAtom: vi.fn(),
  });
});

vi.mock('../../api', () => ({
  getTodos: vi.fn(),
}));

// mock DeleteTodoBtn rendered by TodoList
vi.mock('./TodoList', () => ({
  __esModule: true,
  default: vi.fn(() => null),
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

describe('TodoListContainer', () => {
  let queryClient: QueryClient;
  const getTodosMock = getTodos as unknown as ReturnType<typeof vi.fn>;
  const useAtomMock = useAtom as unknown as ReturnType<typeof vi.fn>;
  const todoComponentMock = vi.mocked(TodoList);
  const todos: Todo[] = [
    { id: '1', title: 'Test Todo', status: 'pending', createdAt: '', updatedAt: '' },
    {
      id: '2',
      title: 'Another Todo',
      status: 'completed',
      createdAt: '',
      updatedAt: '',
    },
  ];

  beforeEach(() => {
    queryClient = new QueryClient();
    vi.clearAllMocks();
    useAtomMock.mockReturnValue([1, vi.fn()]);
    todoComponentMock.mockReset();
  });

  it('renders loading state', async () => {
    getTodosMock.mockImplementation(() => new Promise(() => {}));
    renderWithProviders(<TodoListContainer />, { queryClient });
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders empty state', async () => {
    getTodosMock.mockResolvedValue([[], 1]);

    renderWithProviders(<TodoListContainer />, { queryClient });

    expect(todoComponentMock).toHaveBeenCalledWith(
      expect.objectContaining({
        todos: [],
        isLoading: true,
        isFetching: true,
        page: 1,
        pageCount: 1,
      }),
      undefined,
    );
    expect(getTodosMock).toHaveBeenCalledWith(1, 10);
  });

  it('renders todos', async () => {
    getTodosMock.mockResolvedValue([todos, 10]);

    renderWithProviders(<TodoListContainer />, { queryClient });

    expect(todoComponentMock).toHaveBeenCalledWith(
      expect.objectContaining({
        todos: expect.any(Array),
        isLoading: true,
        isFetching: true,
        page: 1,
        pageCount: 1,
      }),
      undefined,
    );
    expect(getTodosMock).toHaveBeenCalledWith(1, 10);
  });
});
