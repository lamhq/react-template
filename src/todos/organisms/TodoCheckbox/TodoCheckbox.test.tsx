import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { Todo } from '../../api';
import TodoCheckbox from './TodoCheckbox';

const mockTodo: Todo = {
  id: '1',
  title: 'Test Todo',
  status: 'pending',
  createdAt: '',
  updatedAt: '',
};

describe('TodoCheckbox', () => {
  it('renders an unchecked checkbox when todo is pending', () => {
    render(<TodoCheckbox todo={mockTodo} onCheck={vi.fn()} isPending={false} />);

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    expect(checkbox).not.toBeDisabled();
  });

  it('renders a checked checkbox when todo is completed', () => {
    render(
      <TodoCheckbox
        todo={{ ...mockTodo, status: 'completed' }}
        onCheck={vi.fn()}
        isPending={false}
      />,
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('calls onCheck when checkbox is clicked', () => {
    const onCheck = vi.fn();

    render(<TodoCheckbox todo={mockTodo} onCheck={onCheck} isPending={false} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(onCheck).toHaveBeenCalledWith(true);
  });

  it('is disabled when isPending is true', () => {
    render(<TodoCheckbox todo={mockTodo} onCheck={vi.fn()} isPending={true} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });
});
