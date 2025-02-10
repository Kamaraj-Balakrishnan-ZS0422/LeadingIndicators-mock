// TranslationContext.js
import React, { createContext, useContext } from 'react';
import { useTranslation } from 'react-i18next';

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const { t } = useTranslation(); // Destructure t here
  return (
    <TranslationContext.Provider value={t}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslate = () => {
  const t = useContext(TranslationContext);
  if (!t) {
    throw new Error("useTranslate must be used within a TranslationProvider");
  }
  return t;
};
