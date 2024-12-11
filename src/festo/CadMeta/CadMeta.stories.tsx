import type { Meta, StoryObj } from '@storybook/react';

import CadMeta from './CadMeta';

const meta = {
  component: CadMeta,
} satisfies Meta<typeof CadMeta>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};