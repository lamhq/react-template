import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { DeleteTodoBtnProps } from './DeleteTodoBtn';
import DeleteTodoBtn from './DeleteTodoBtn';

const renderComponent = (props?: Partial<DeleteTodoBtnProps>) => {
  const defaultProps: DeleteTodoBtnProps = {
    onDelete: vi.fn(),
    isPending: false,
    size: 'sm',
  };
  return render(<DeleteTodoBtn {...defaultProps} {...props} />);
};

describe('DeleteTodoBtn', () => {
  it('renders the delete icon button', () => {
    renderComponent();
    const button = screen.getByRole('button', { name: /delete todo/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it('calls onDelete when clicked', () => {
    const onDelete = vi.fn();
    renderComponent({ onDelete });
    const button = screen.getByRole('button', { name: /delete todo/i });
    fireEvent.click(button);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('is disabled when isPending is true', () => {
    renderComponent({ isPending: true });
    const button = screen.getByRole('button', { name: /delete todo/i });
    expect(button).toBeDisabled();
  });
});
