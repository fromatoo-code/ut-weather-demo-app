import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import env from '../../config/env';
import en from './locales/en.json';
import et from './locales/et.json';

const resources = {
  en: {
    translation: en,
  },
  et: {
    translation: et,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: env.defaultLanguage,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
