import type { Meta, StoryObj } from '@storybook/react';

import CadDownload from './CadDownload';

const meta = {
  component: CadDownload,
} satisfies Meta<typeof CadDownload>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};