import { useContext } from 'react';
import type { NotificationContextType } from './contexts';
import { NotificationContext } from './contexts';

export function useNotification(): NotificationContextType {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('NotificationProvider is missing in the React component tree');
  }
  return context;
}
