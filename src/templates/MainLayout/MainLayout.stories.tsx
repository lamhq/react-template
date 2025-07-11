import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ListRoundedIcon from '@mui/icons-material/ListRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { createRoutesStub } from 'react-router';

import { AuthProvider } from '../../auth-state';
import { NotificationProvider } from '../../notification';
import MainLayout from './MainLayout';
import { LayoutProvider } from './Provider';
import type { MenuItem } from './types';

const sampleMenuItems: MenuItem[] = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: DashboardRoundedIcon,
  },
  {
    path: '/todos',
    label: 'Todos',
    icon: ListRoundedIcon,
  },
  {
    path: '/profile',
    label: 'Profile',
    icon: PersonRoundedIcon,
  },
  {
    path: '/settings',
    label: 'Settings',
    icon: SettingsRoundedIcon,
  },
];

const meta = {
  component: MainLayout,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    menuItems: sampleMenuItems,
  },
  render: () => {
    const Stub = createRoutesStub([
      {
        path: '*',
        Component: () => <MainLayout menuItems={sampleMenuItems} />,
      },
    ]);
    return <Stub initialEntries={['/dashboard']} />;
  },
  tags: ['autodocs'],
  argTypes: {
    menuItems: {
      control: 'object',
      description: 'Array of menu items to display in the sidebar',
    },
  },
  decorators: [
    (Story) => (
      <LayoutProvider>
        <NotificationProvider>
          <AuthProvider initialState={{}}>
            <Story />
          </AuthProvider>
        </NotificationProvider>
      </LayoutProvider>
    ),
  ],
} satisfies Meta<typeof MainLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Layout in desktop view. Shows the header, sidebar, and main content area with breadcrumbs.',
      },
    },
  },
  globals: {
    viewport: { value: 'desktop', isRotated: false },
  },
};

export const Mobile: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Layout in mobile view. Sidebar is collapsed.',
      },
    },
  },
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};
