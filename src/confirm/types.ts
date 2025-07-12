import type { ButtonProps } from '@mui/joy/Button';
import type { ModalProps } from '@mui/joy/Modal';

export type ConfirmFn = (options?: ConfirmDialogOptions) => Promise<boolean>;

export type ConfirmDialogOptions = {
  title?: React.ReactNode;
  content?: React.ReactNode;
  confirmationText?: React.ReactNode;
  cancellationText?: React.ReactNode;
  dialogProps?: Omit<ModalProps, 'open'>;
  confirmationButtonProps?: ButtonProps;
  cancellationButtonProps?: ButtonProps;
};
