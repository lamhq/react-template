import '@festo-ui/web-essentials/dist/css/festo-web-essentials.min.css';
import '@festo-ui/react/index.css';
import React from 'react';
import reactDom from 'react-dom/client';
import CadSelPopup from './CadSelPopup';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = reactDom.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <CadSelPopup />
    </React.StrictMode>,
  );
}
