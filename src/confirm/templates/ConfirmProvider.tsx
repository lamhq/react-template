import React, { useCallback, useState } from 'react';
import ConfirmContext from '../contexts/ConfirmContext';
import ConfirmDialog from '../molecules/ConfirmDialog';
import type { ConfirmDialogOptions } from '../types';

type ConfirmState = {
  open: boolean;
  options?: ConfirmDialogOptions;
  resolve?: (value: boolean) => void;
};

export default function ConfirmProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<ConfirmState>({ open: false });

  const confirm = useCallback((options?: ConfirmDialogOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({
        open: true,
        options,
        resolve,
      });
    });
  }, []);

  const handleClose = useCallback(() => {
    setState((prev) => {
      if (prev.resolve) {
        prev.resolve(false);
      }
      return { open: false };
    });
  }, []);

  const handleConfirm = useCallback(() => {
    setState((prev) => {
      if (prev.resolve) {
        prev.resolve(true);
      }
      return { open: false };
    });
  }, []);

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <ConfirmDialog
        open={state.open}
        options={state.options}
        onCancel={handleClose}
        onConfirm={handleConfirm}
      />
    </ConfirmContext.Provider>
  );
}
