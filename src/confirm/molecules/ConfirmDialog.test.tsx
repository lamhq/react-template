import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ConfirmDialog from './ConfirmDialog';

const defaultOptions = {
  title: 'Test Title',
  content: 'Test Content',
  confirmationText: 'Yes',
  cancellationText: 'No',
};

describe('ConfirmDialog', () => {
  const onCancel = vi.fn();
  const onConfirm = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('does not render when open is false', () => {
      render(
        <ConfirmDialog
          open={false}
          onCancel={onCancel}
          onConfirm={onConfirm}
          options={defaultOptions}
        />,
      );
      expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
      expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
    });

    it('renders with title, content, and buttons when open', () => {
      render(
        <ConfirmDialog
          open={true}
          onCancel={onCancel}
          onConfirm={onConfirm}
          options={defaultOptions}
        />,
      );
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument();
    });

    it('renders with default options if none provided', () => {
      render(
        <ConfirmDialog open={true} onCancel={onCancel} onConfirm={onConfirm} />,
      );
      expect(screen.getByText('Are you sure?')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Ok' })).toBeInTheDocument();
    });
  });

  describe('Button actions', () => {
    it('calls onCancel when cancellation button is clicked', () => {
      render(
        <ConfirmDialog
          open={true}
          onCancel={onCancel}
          onConfirm={onConfirm}
          options={defaultOptions}
        />,
      );
      fireEvent.click(screen.getByRole('button', { name: 'No' }));
      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it('calls onConfirm when confirmation button is clicked', () => {
      render(
        <ConfirmDialog
          open={true}
          onCancel={onCancel}
          onConfirm={onConfirm}
          options={defaultOptions}
        />,
      );
      fireEvent.click(screen.getByRole('button', { name: 'Yes' }));
      expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it('calls onCancel when modal is dismissed by clicking outside', () => {
      render(
        <ConfirmDialog
          open={true}
          onCancel={onCancel}
          onConfirm={onConfirm}
          options={defaultOptions}
        />,
      );
      // The Modal backdrop has role="presentation" in Joy UI
      const modalRoot = screen.getByRole('presentation');
      const backdrop = modalRoot.querySelector('.MuiModal-backdrop');
      if (!backdrop) {
        throw new Error('Backdrop not found');
      }
      fireEvent.click(backdrop);

      expect(onCancel).toHaveBeenCalledTimes(1);
    });
  });

  describe('Custom options', () => {
    it('renders custom confirmation and cancellation button props', () => {
      render(
        <ConfirmDialog
          open={true}
          onCancel={onCancel}
          onConfirm={onConfirm}
          options={{
            ...defaultOptions,
            confirmationButtonProps: { color: 'danger' },
            cancellationButtonProps: { color: 'neutral' },
          }}
        />,
      );
      // Check that the buttons are rendered and clickable
      expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument();
    });

    it('renders custom content as React node', () => {
      render(
        <ConfirmDialog
          open={true}
          onCancel={onCancel}
          onConfirm={onConfirm}
          options={{
            ...defaultOptions,
            content: <span data-testid="custom-content">Custom</span>,
          }}
        />,
      );
      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    });
  });
});
