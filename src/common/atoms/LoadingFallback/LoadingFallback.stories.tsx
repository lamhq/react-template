import type { Meta, StoryObj } from '@storybook/react-vite';

import LoadingFallback from './LoadingFallback';

const meta = {
  component: LoadingFallback,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof LoadingFallback>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Shows the default loading fallback component with a centered circular progress indicator.',
      },
    },
  },
};

export const InContainer: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Shows the loading fallback component within a container to demonstrate how it appears in a constrained space.',
      },
    },
  },
};
