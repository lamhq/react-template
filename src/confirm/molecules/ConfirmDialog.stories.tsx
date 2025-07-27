import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import type { ConfirmDialogOptions } from '../types';
import ConfirmDialog from './ConfirmDialog';

const meta = {
  component: ConfirmDialog,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    open: {
      description: 'Whether the dialog is open',
      control: 'boolean',
    },
    options: {
      description: 'Dialog options (title, content, etc.)',
      control: 'object',
    },
    onCancel: {
      description: 'Called when cancel is clicked or dialog is closed',
      control: false,
    },
    onConfirm: {
      description: 'Called when confirm is clicked',
      control: false,
    },
  },
} satisfies Meta<typeof ConfirmDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultOptions: ConfirmDialogOptions = {
  title: 'Are you sure?',
  content: 'This action cannot be undone.',
  confirmationText: 'Yes',
  cancellationText: 'No',
};

export const Default: Story = {
  args: {
    open: true,
    options: defaultOptions,
    onCancel: fn(),
    onConfirm: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the default confirm dialog.',
      },
    },
  },
};

export const CustomContent: Story = {
  args: {
    open: true,
    options: {
      ...defaultOptions,
      title: 'Delete item?',
      content: 'Are you sure you want to delete this item? This cannot be undone.',
      confirmationText: 'Delete',
      cancellationText: 'Cancel',
      confirmationButtonProps: { color: 'danger' },
    },
    onCancel: fn(),
    onConfirm: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the dialog with custom title and content.',
      },
    },
  },
};
