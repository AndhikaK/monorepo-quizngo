import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import account from './en/account.json';
import common from './en/common.json';

export const defaultNS = 'common';

i18n.use(initReactI18next).init({
  debug: true,
  resources: {
    en: {
      common,
      account,
    },
  },
  lng: 'en', // Default language
  fallbackLng: 'en',
  defaultNS,
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
