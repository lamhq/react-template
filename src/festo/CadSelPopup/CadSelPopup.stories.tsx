import type { Meta, StoryObj } from '@storybook/react';

import CadSelPopup from './CadSelPopup';

const meta = {
  component: CadSelPopup,
} satisfies Meta<typeof CadSelPopup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
