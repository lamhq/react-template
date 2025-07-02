import { createContext } from 'react';

export type NotificationContextType = {
  showSuccess: (message: string, duration?: number) => void;
  showError: (message: string, duration?: number) => void;
  showInfo: (message: string, duration?: number) => void;
  showWarning: (message: string, duration?: number) => void;
};

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export type NotificationState = {
  open: boolean;
  message: string;
  color: 'primary' | 'neutral' | 'danger' | 'success' | 'warning';
  autoHideDuration?: number;
};
