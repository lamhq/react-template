import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LoadingFallback from './LoadingFallback';

describe('LoadingFallback', () => {
  it('renders without crashing', () => {
    render(<LoadingFallback />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('is centered within its container', () => {
    render(<LoadingFallback />);
    const container = screen.getByRole('progressbar').closest('div');

    // Check that the container has flexbox centering properties
    expect(container).toHaveStyle({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    });
  });

  it('has the correct height', () => {
    render(<LoadingFallback />);
    const container = screen.getByRole('progressbar').closest('div');
    expect(container).toHaveStyle({ height: '200px' });
  });
});
