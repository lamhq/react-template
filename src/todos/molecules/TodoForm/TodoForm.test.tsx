import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import TodoForm from './TodoForm';

describe('TodoForm', () => {
  const defaultProps = {
    onSubmit: vi.fn(),
    isPending: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders form with input and button', () => {
      render(<TodoForm {...defaultProps} />);
      expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
    });
  });

  describe('Form submission', () => {
    it('calls onSubmit with form data when valid', async () => {
      const onSubmit = vi.fn();
      render(<TodoForm {...defaultProps} onSubmit={onSubmit} />);
      const input = screen.getByPlaceholderText('Title');
      const button = screen.getByRole('button', { name: 'Add' });
      fireEvent.change(input, { target: { value: 'New Todo' } });
      fireEvent.click(button);
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith({ title: 'New Todo' });
      });
    });

    it('clears input after submit', async () => {
      render(<TodoForm {...defaultProps} />);
      const input = screen.getByPlaceholderText('Title');
      const button = screen.getByRole('button', { name: 'Add' });
      fireEvent.change(input, { target: { value: 'Clear Me' } });
      fireEvent.click(button);
      await waitFor(() => {
        expect(input).toHaveValue('');
      });
    });
  });

  describe('Validation', () => {
    it('does not call onSubmit if input is empty', async () => {
      const onSubmit = vi.fn();
      render(<TodoForm {...defaultProps} onSubmit={onSubmit} />);
      const button = screen.getByRole('button', { name: 'Add' });
      fireEvent.click(button);
      await waitFor(() => {
        expect(onSubmit).not.toHaveBeenCalled();
      });
    });
  });

  describe('Loading state', () => {
    it('shows loading state when isPending is true', () => {
      render(<TodoForm {...defaultProps} isPending={true} />);
      const button = screen.getByRole('button', { name: 'Adding...' });
      expect(button).toBeDisabled();
    });
    it('does not show loading state when isPending is false', () => {
      render(<TodoForm {...defaultProps} isPending={false} />);
      const button = screen.getByRole('button', { name: 'Add' });
      expect(button).not.toBeDisabled();
    });
  });

  describe('User interactions', () => {
    it('allows typing in the input field', () => {
      render(<TodoForm {...defaultProps} />);
      const input = screen.getByPlaceholderText('Title');
      fireEvent.change(input, { target: { value: 'Type here' } });
      expect(input).toHaveValue('Type here');
    });
    it('allows clearing and retyping in the input field', () => {
      render(<TodoForm {...defaultProps} />);
      const input = screen.getByPlaceholderText('Title');
      fireEvent.change(input, { target: { value: 'Old' } });
      fireEvent.change(input, { target: { value: '' } });
      fireEvent.change(input, { target: { value: 'New' } });
      expect(input).toHaveValue('New');
    });
  });
});
