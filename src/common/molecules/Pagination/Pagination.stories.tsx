import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import Pagination from './Pagination';

const meta = {
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    count: {
      control: { type: 'number', min: 1 },
      description: 'Total number of pages',
    },
    page: {
      control: { type: 'number', min: 1 },
      description: 'Current active page',
    },
    onChange: {
      description: 'Callback fired when page changes',
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 10,
    page: 1,
    onChange: fn(),
  },
};

export const NoPage: Story = {
  args: {
    count: 1,
    page: 1,
    onChange: fn(),
  },
  tags: ['autodocs', '!dev', '!test'],
  parameters: {
    docs: {
      description: {
        story:
          'When there is only one page (count < 2), the pagination component does not render anything. This prevents unnecessary UI clutter.',
      },
    },
  },
};
