import { useContext } from 'react';
import ConfirmContext from '../contexts/ConfirmContext';

/**
 * Show a confirmation dialog to user
 * Return function that return a promise
 * that resolve to `yes` or `no` based on user selection
 * @returns boolean
 */
export default function useConfirm() {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error('ConfirmProvider is missing in component tree');
  }
  return context;
}
