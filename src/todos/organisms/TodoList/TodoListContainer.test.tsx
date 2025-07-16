import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { useAtom } from 'jotai';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getTodos } from '../../api';
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
  const getTodosMock = vi.mocked(getTodos);
  const useAtomMock = vi.mocked(useAtom);
  const todoComponentMock = vi.mocked(TodoList);

  beforeEach(() => {
    queryClient = new QueryClient();
    vi.clearAllMocks();
    useAtomMock.mockReturnValue([1, vi.fn()]);
    todoComponentMock.mockReset();
  });

  it('renders TodoList', async () => {
    getTodosMock.mockImplementation(() => new Promise(() => {}));

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
});
