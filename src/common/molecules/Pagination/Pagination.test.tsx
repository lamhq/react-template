import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Pagination from './Pagination';

describe('Pagination', () => {
  const defaultProps = {
    count: 5,
    page: 1,
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders pagination with correct number of page buttons', () => {
      render(<Pagination {...defaultProps} />);

      // Should render 5 page buttons (1, 2, 3, 4, 5)
      expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '4' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument();
    });

    it('renders previous and next navigation buttons', () => {
      render(<Pagination {...defaultProps} />);

      expect(
        screen.getByRole('button', { name: 'Previous Page' }),
      ).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Next Page' })).toBeInTheDocument();
    });

    it('does not render when count is 1', () => {
      render(<Pagination count={1} page={1} onChange={vi.fn()} />);

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('does not render when count is 0', () => {
      render(<Pagination count={0} page={1} onChange={vi.fn()} />);

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('handles negative count by treating it as 1', () => {
      render(<Pagination count={-5} page={1} onChange={vi.fn()} />);

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });

  describe('Current page styling', () => {
    it('highlights the current page correctly', () => {
      render(<Pagination count={5} page={3} onChange={vi.fn()} />);

      const currentPageButton = screen.getByRole('button', { name: '3' });
      expect(currentPageButton).toHaveAttribute('aria-current', 'page');
    });

    it('applies correct styling to current page', () => {
      render(<Pagination count={5} page={3} onChange={vi.fn()} />);

      const currentPageButton = screen.getByRole('button', { name: '3' });
      expect(currentPageButton).toHaveStyle({ fontWeight: 'bold' });
    });

    it('does not highlight non-current pages', () => {
      render(<Pagination count={5} page={3} onChange={vi.fn()} />);

      const otherPageButton = screen.getByRole('button', { name: '1' });
      expect(otherPageButton).not.toHaveAttribute('aria-current');
    });
  });

  describe('Navigation button states', () => {
    it('disables previous button on first page', () => {
      render(<Pagination count={5} page={1} onChange={vi.fn()} />);

      const prevButton = screen.getByRole('button', { name: 'Previous Page' });
      expect(prevButton).toBeDisabled();
    });

    it('enables previous button when not on first page', () => {
      render(<Pagination count={5} page={3} onChange={vi.fn()} />);

      const prevButton = screen.getByRole('button', { name: 'Previous Page' });
      expect(prevButton).not.toBeDisabled();
    });

    it('disables next button on last page', () => {
      render(<Pagination count={5} page={5} onChange={vi.fn()} />);

      const nextButton = screen.getByRole('button', { name: 'Next Page' });
      expect(nextButton).toBeDisabled();
    });

    it('enables next button when not on last page', () => {
      render(<Pagination count={5} page={3} onChange={vi.fn()} />);

      const nextButton = screen.getByRole('button', { name: 'Next Page' });
      expect(nextButton).not.toBeDisabled();
    });
  });

  describe('User interactions', () => {
    it('calls onChange with correct page when clicking a page button', () => {
      const onChange = vi.fn();
      render(<Pagination count={5} page={1} onChange={onChange} />);

      const pageButton = screen.getByRole('button', { name: '3' });
      fireEvent.click(pageButton);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(expect.any(Object), 3);
    });

    it('calls onChange with previous page when clicking previous button', () => {
      const onChange = vi.fn();
      render(<Pagination count={5} page={3} onChange={onChange} />);

      const prevButton = screen.getByRole('button', { name: 'Previous Page' });
      fireEvent.click(prevButton);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(expect.any(Object), 2);
    });

    it('calls onChange with next page when clicking next button', () => {
      const onChange = vi.fn();
      render(<Pagination count={5} page={3} onChange={onChange} />);

      const nextButton = screen.getByRole('button', { name: 'Next Page' });
      fireEvent.click(nextButton);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(expect.any(Object), 4);
    });

    it('does not call onChange when clicking disabled previous button', () => {
      const onChange = vi.fn();
      render(<Pagination count={5} page={1} onChange={onChange} />);

      const prevButton = screen.getByRole('button', { name: 'Previous Page' });
      fireEvent.click(prevButton);

      expect(onChange).not.toHaveBeenCalled();
    });

    it('does not call onChange when clicking disabled next button', () => {
      const onChange = vi.fn();
      render(<Pagination count={5} page={5} onChange={onChange} />);

      const nextButton = screen.getByRole('button', { name: 'Next Page' });
      fireEvent.click(nextButton);

      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA labels', () => {
      render(<Pagination {...defaultProps} />);

      expect(screen.getByLabelText('pagination button group')).toBeInTheDocument();
      expect(screen.getByLabelText('Previous Page')).toBeInTheDocument();
      expect(screen.getByLabelText('Next Page')).toBeInTheDocument();
    });

    it('marks current page with aria-current', () => {
      render(<Pagination count={5} page={3} onChange={vi.fn()} />);

      const currentPageButton = screen.getByRole('button', { name: '3' });
      expect(currentPageButton).toHaveAttribute('aria-current', 'page');
    });

    it('does not mark non-current pages with aria-current', () => {
      render(<Pagination count={5} page={3} onChange={vi.fn()} />);

      const otherPageButton = screen.getByRole('button', { name: '1' });
      expect(otherPageButton).not.toHaveAttribute('aria-current');
    });
  });

  describe('Edge cases', () => {
    it('handles large number of pages', () => {
      render(<Pagination count={100} page={50} onChange={vi.fn()} />);

      // Should render all 100 page buttons
      expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '50' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '100' })).toBeInTheDocument();
    });

    it('handles page number greater than count', () => {
      render(<Pagination count={5} page={10} onChange={vi.fn()} />);

      // Should still render pagination with 5 pages
      expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: '10' })).not.toBeInTheDocument();
    });

    it('handles page number less than 1', () => {
      render(<Pagination count={5} page={0} onChange={vi.fn()} />);

      // Should still render pagination with 5 pages
      expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument();
    });
  });
});
