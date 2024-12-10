import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';

import CadSelPopup from './CadSelPopup';

const meta: Meta<typeof CadSelPopup> = {
  title: 'CadSelPopup',
  component: CadSelPopup,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    article: '6211',
  },
  render: function Render(args) {
    const [{ isOpen }, updateArgs] = useArgs();

    function onClose() {
      updateArgs({ isOpen: false });
    }

    return <CadSelPopup {...args} onClose={onClose} isOpen={isOpen} />;
  },
};
