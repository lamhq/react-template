import { ConfirmModal } from '@festo-ui/react';
import { useState } from 'react';

export default function CadSelPopup() {
  const [isOpen, setConfirmModalOpen] = useState(true);
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={() => setConfirmModalOpen(false)}
      onCancel={() => setConfirmModalOpen(false)}
      onOk={() => setConfirmModalOpen(false)}
      title="hello"
      body="body"
    />
  );
}
