import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import type { ApiError } from '../../types';
import ErrorFallback from './ErrorFallback';

const meta = {
  component: ErrorFallback,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    error: {
      description: 'The error object that caused the fallback to render',
      control: false,
    },
    resetErrorBoundary: {
      description: 'Function to reset the error boundary',
      control: false,
    },
  },
} satisfies Meta<typeof ErrorFallback>;

export default meta;

type Story = StoryObj<typeof meta>;

// Helper function to create API errors
const createApiError = (status: number): ApiError => ({
  message: `HTTP ${status} Error`,
  response: { status },
  request: {},
});

// Helper function to create network error
const createNetworkError = (): ApiError => ({
  message: 'Network Error',
  request: {},
});

export const Default: Story = {
  args: {
    error: new Error('An unexpected error occurred'),
    resetErrorBoundary: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the default error fallback for generic JavaScript errors.',
      },
    },
  },
};

export const NetworkError: Story = {
  args: {
    error: createNetworkError(),
    resetErrorBoundary: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the error fallback for network connectivity issues.',
      },
    },
  },
};

export const NotFoundError: Story = {
  args: {
    error: createApiError(404),
    resetErrorBoundary: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the error fallback for 404 Not Found errors.',
      },
    },
  },
};

export const ForbiddenError: Story = {
  args: {
    error: createApiError(403),
    resetErrorBoundary: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the error fallback for 403 Forbidden errors.',
      },
    },
  },
};

export const ServerError: Story = {
  args: {
    error: createApiError(500),
    resetErrorBoundary: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the error fallback for 500 Internal Server Error.',
      },
    },
  },
};

export const OtherApiError: Story = {
  args: {
    error: createApiError(422),
    resetErrorBoundary: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows the error fallback for other API errors (422 Unprocessable Entity).',
      },
    },
  },
};
