import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { Todo } from '../../api';
import TodoList from './TodoList';

// mock DeleteTodoBtn rendered by TodoList
vi.mock('../DeleteTodoBtn', () => ({
  __esModule: true,
  default: () => null,
}));

// mock TodoCheckbox rendered by TodoList
vi.mock('../TodoCheckbox', () => ({
  __esModule: true,
  default: () => null,
}));

const mockTodos: Todo[] = [
  {
    id: '1',
    title: 'Buy groceries',
    status: 'pending',
    createdAt: '',
    updatedAt: '',
  },
  {
    id: '2',
    title: 'Write documentation',
    status: 'completed',
    createdAt: '',
    updatedAt: '',
  },
];

describe('TodoList', () => {
  it('renders loading fallback when isLoading', () => {
    render(
      <TodoList
        todos={[]}
        isLoading={true}
        isFetching={false}
        page={1}
        pageCount={1}
        onPageChange={vi.fn()}
      />,
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders empty state when no todos', () => {
    render(
      <TodoList
        todos={[]}
        isLoading={false}
        isFetching={false}
        page={1}
        pageCount={1}
        onPageChange={vi.fn()}
      />,
    );
    expect(screen.getByText(/no todos found/i)).toBeInTheDocument();
  });

  it('renders todos', () => {
    render(
      <TodoList
        todos={mockTodos}
        isLoading={false}
        isFetching={false}
        page={1}
        pageCount={1}
        onPageChange={vi.fn()}
      />,
    );
    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    expect(screen.getByText('Write documentation')).toBeInTheDocument();
  });

  it('applies blur when isFetching', () => {
    render(
      <TodoList
        todos={mockTodos}
        isLoading={false}
        isFetching={true}
        page={1}
        pageCount={1}
        onPageChange={vi.fn()}
      />,
    );
    // The blur is a style, so we check for the style attribute
    expect(screen.getByTestId('todo-list')).toHaveStyle({ filter: 'blur(1.5px)' });
  });

  it('renders pagination when pageCount > 1', () => {
    render(
      <TodoList
        todos={mockTodos}
        isLoading={false}
        isFetching={false}
        page={2}
        pageCount={3}
        onPageChange={vi.fn()}
      />,
    );
    expect(screen.getByRole('button', { name: /next page/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /previous page/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /[0-9]/ })).toHaveLength(3);
  });

  it('calls onPageChange when pagination button is clicked', () => {
    const onPageChange = vi.fn();
    render(
      <TodoList
        todos={mockTodos}
        isLoading={false}
        isFetching={false}
        page={1}
        pageCount={2}
        onPageChange={onPageChange}
      />,
    );
    const nextBtn = screen.getByRole('button', { name: /next page/i });
    fireEvent.click(nextBtn);
    expect(onPageChange).toHaveBeenCalled();
  });
});
