import type { Decorator, Meta, StoryContext, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import type { ConfirmDialogOptions } from '../types';
import ConfirmDialog from './ConfirmDialog';

const withDialogButton: Decorator = (Story, context: StoryContext) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <button onClick={handleOpen} style={{ marginBottom: 16 }}>
        Show Dialog
      </button>
      <Story
        {...context}
        args={{
          ...context.args,
          open,
          onCancel: () => {
            if (typeof context.args.onCancel === 'function') {
              context.args.onCancel();
            }
            handleClose();
          },
          onConfirm: () => {
            if (typeof context.args.onConfirm === 'function') {
              context.args.onConfirm();
            }
            handleClose();
          },
        }}
      />
    </div>
  );
};

const meta = {
  component: ConfirmDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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
  decorators: [withDialogButton],
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
    open: false,
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
    open: false,
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
