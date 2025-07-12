import type { Meta, StoryObj } from '@storybook/react-vite';
import { createRoutesStub } from 'react-router';

import NotFoundPage from './NotFoundPage';

const meta = {
  component: NotFoundPage,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'App/Pages/NotFoundPage',
} satisfies Meta<typeof NotFoundPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const Stub = createRoutesStub([
      {
        path: '*',
        Component: NotFoundPage,
      },
    ]);
    return <Stub initialEntries={['/non-existent-page']} />;
  },
};
