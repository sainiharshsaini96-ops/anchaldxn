import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('dxnanchal_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('dxnanchal_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key) => {
    if (!translations[lang]) return key;
    return translations[lang][key] || translations['en'][key] || key;
  };

  const toggleLanguage = (targetLang) => {
    if (targetLang === 'en' || targetLang === 'hi') {
      setLang(targetLang);
    } else {
      setLang((prev) => (prev === 'en' ? 'hi' : 'en'));
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLanguage: toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
