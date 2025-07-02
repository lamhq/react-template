import Snackbar, { type SnackbarCloseReason } from '@mui/joy/Snackbar';
import React, { useCallback, useState } from 'react';
import {
  NotificationContext,
  type NotificationContextType,
  type NotificationState,
} from './contexts';

const defaultState: NotificationState = {
  open: false,
  message: '',
  color: 'primary',
  autoHideDuration: 3000,
};

function useNotificationProvider() {
  const [state, setState] = useState<NotificationState>(defaultState);

  const showNotification = useCallback(
    (message: string, color: NotificationState['color'], duration?: number) => {
      setState({
        open: true,
        message,
        color,
        autoHideDuration: duration ?? 3000,
      });
    },
    [],
  );

  const showSuccess = useCallback(
    (message: string, duration?: number) => {
      showNotification(message, 'success', duration);
    },
    [showNotification],
  );

  const showError = useCallback(
    (message: string, duration?: number) => {
      showNotification(message, 'danger', duration);
    },
    [showNotification],
  );

  const showInfo = useCallback(
    (message: string, duration?: number) => {
      showNotification(message, 'primary', duration);
    },
    [showNotification],
  );

  const showWarning = useCallback(
    (message: string, duration?: number) => {
      showNotification(message, 'warning', duration);
    },
    [showNotification],
  );

  const handleClose = (
    _: React.SyntheticEvent | Event | null,
    reason: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') return;
    setState((prev: NotificationState) => ({ ...prev, open: false }));
  };

  const contextValue: NotificationContextType = {
    showSuccess,
    showError,
    showInfo,
    showWarning,
  };

  return { state, handleClose, contextValue };
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { state, handleClose, contextValue } = useNotificationProvider();

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      <Snackbar
        open={state.open}
        color={state.color}
        autoHideDuration={state.autoHideDuration}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        {state.message}
      </Snackbar>
    </NotificationContext.Provider>
  );
}
