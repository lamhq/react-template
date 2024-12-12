import React from 'react';
import reactDom from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './store';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = reactDom.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  );
}
