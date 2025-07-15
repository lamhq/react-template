import { fireEvent, render, screen } from '@testing-library/react';
import { useNavigate } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { HOME_ROUTE } from '../../routes';

import NotFoundPage from './NotFoundPage';

// Mock useNavigate from react-router
vi.mock('react-router', async (importOriginal) => {
  const originalModule = await importOriginal();
  return Object.assign({}, originalModule, {
    useNavigate: vi.fn(),
  });
});

describe('NotFoundPage', () => {
  const navigateMock = vi.fn();
  const useNavigateMock = useNavigate as unknown as ReturnType<typeof vi.fn>;
  useNavigateMock.mockReturnValue(navigateMock);

  beforeEach(() => {
    navigateMock.mockReset();
  });

  it('renders 404 and not found message', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(
      screen.getByText(
        "The page you're looking for doesn't exist or has been moved.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go to Home' })).toBeInTheDocument();
  });

  it('navigates to home when button is clicked', () => {
    render(<NotFoundPage />);
    const button = screen.getByRole('button', { name: 'Go to Home' });
    fireEvent.click(button);
    expect(navigateMock).toHaveBeenCalledWith(HOME_ROUTE);
  });
});
