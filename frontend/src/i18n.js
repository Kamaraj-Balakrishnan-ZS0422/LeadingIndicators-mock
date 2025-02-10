import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

// Initialize i18next
i18n
  .use(HttpBackend) // Load translation files from public folder
  .use(LanguageDetector) // Detect language from the browser
  .use(initReactI18next) // Connect with React
  .init({
    fallbackLng: 'en', // Default language
    debug: true, // Enable console logs for debugging
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // Path to translation files
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: { useSuspense: true },
  });

export default i18n;
