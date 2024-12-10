import { useState } from 'react';
import CadSelPopup from './CadSelPopup/CadSelPopup';

export default function App() {
  const [isOpen, setOpen] = useState(true);
  return (
    <CadSelPopup
      article="1234"
      isOpen={isOpen}
      onClose={() => setOpen(false)}
    />
  );
}
