import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Header from './Header';
import { toggleSidebar } from './utils';

// Mock toggleSidebar
vi.mock('./utils', async (importOriginal) => {
  const originalModule = await importOriginal();
  return Object.assign({}, originalModule, {
    toggleSidebar: vi.fn(),
  });
});

describe('Header', () => {
  it('renders the header and menu button', () => {
    render(<Header />);
    // The button should be in the document
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    // The MenuIcon should be rendered (by aria-label or svg)
    expect(screen.getByTestId('MenuIcon')).toBeInTheDocument();
  });

  it('calls toggleSidebar when menu button is clicked', () => {
    render(<Header />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(toggleSidebar).toHaveBeenCalled();
  });
});
