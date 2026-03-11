import { createContext, useContext, useState, useCallback } from 'react';
import { t as translate, languages } from '../i18n';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('swallow_language') || 'fr';
  });

  const changeLanguage = useCallback((lang) => {
    setLanguage(lang);
    localStorage.setItem('swallow_language', lang);
    document.documentElement.setAttribute('lang', lang);
  }, []);

  const t = useCallback((key) => {
    return translate(key, language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
