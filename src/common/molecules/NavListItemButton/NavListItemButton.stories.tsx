import type { Meta, StoryObj } from '@storybook/react-vite';
import { createRoutesStub } from 'react-router';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import NavListItemButton from './NavListItemButton';

const meta = {
  component: NavListItemButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    to: {
      control: { type: 'text' },
      description: 'The route path to navigate to',
    },
    label: {
      control: { type: 'text' },
      description: 'The text label displayed in the navigation item',
    },
    icon: {
      description: 'The icon component to display',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS class name to apply',
    },
    onClick: {
      description: 'Callback fired when the navigation item is clicked',
    },
  },
  decorators: [
    (Story) => {
      return (
        <List
          size="sm"
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem>
            <Story />
          </ListItem>
        </List>
      );
    },
  ],
} satisfies Meta<typeof NavListItemButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Inactive: Story = {
  args: {
    label: 'Home',
    icon: HomeRoundedIcon,
    to: '/home',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows the navigation item in its inactive state. The item displays the icon, label, and does not have the Mui-selected class applied.',
      },
    },
  },
  render: (args) => {
    const Stub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <ListItemButton
            component={NavListItemButton}
            to={args.to}
            label={args.label}
            icon={args.icon}
          />
        ),
      },
    ]);
    return <Stub initialEntries={['/']} />;
  },
};

export const Active: Story = {
  args: {
    label: 'Home',
    icon: HomeRoundedIcon,
    to: '/',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows the navigation item in its active state. The item has the Mui-selected class applied and represents the current route.',
      },
    },
  },
  render: (args) => {
    const Stub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <ListItemButton
            component={NavListItemButton}
            to={args.to}
            label={args.label}
            icon={args.icon}
          />
        ),
      },
    ]);
    return <Stub initialEntries={['/']} />;
  },
};
