import React from 'react';
import reactDom from 'react-dom/client';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ChainedBackend from 'i18next-chained-backend';
import HttpBackend from 'i18next-http-backend';
import LocalStorageBackend from 'i18next-localstorage-backend';
import { initReactI18next } from 'react-i18next';

import App from './App';
import './index.css';

i18n
  .use(ChainedBackend)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // lng: 'de', // if you're using a language detector, do not define the lng option

    fallbackLng: 'en',

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },

    detection: {
      order: ['navigator'],
    },

    backend: {
      backends: [LocalStorageBackend, HttpBackend],
      backendOptions: [
        {
          expirationTime: 5 * 1000, // 5 sec
        },
        {
          loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
      ],
    },
  });

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = reactDom.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
