import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import type { ConfirmDialogOptions } from '../types';

const DEFAULT_OPTIONS: ConfirmDialogOptions = {
  title: 'Are you sure?',
  content: null,
  confirmationText: 'Ok',
  cancellationText: 'Cancel',
  confirmationButtonProps: {},
  cancellationButtonProps: {},
};

export type ConfirmDialogProps = {
  open: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
  options?: ConfirmDialogOptions;
};

export default function ConfirmDialog({
  open,
  options,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  const {
    title,
    content,
    confirmationText,
    cancellationText,
    dialogProps,
    confirmationButtonProps,
    cancellationButtonProps,
  } = { ...DEFAULT_OPTIONS, ...options };

  return (
    <Modal open={open} onClose={onCancel} {...dialogProps}>
      <ModalDialog>
        <ModalClose />
        {title && (
          <Typography level="h4" component="h2" mb={2}>
            {title}
          </Typography>
        )}
        {content && <Box mb={3}>{content}</Box>}
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
          <Button variant="outlined" {...cancellationButtonProps} onClick={onCancel}>
            {cancellationText}
          </Button>
          <Button color="primary" {...confirmationButtonProps} onClick={onConfirm}>
            {confirmationText}
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
}
