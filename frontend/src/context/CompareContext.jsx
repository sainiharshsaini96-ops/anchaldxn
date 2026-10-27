import React, { createContext, useContext, useState, useEffect } from 'react';
import { productsData } from '../data/productsData';
import { useLanguage } from './LanguageContext';

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const { lang } = useLanguage();
  const [compareList, setCompareList] = useState(() => {
    try {
      const saved = localStorage.getItem('dxnanchal_compare');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('dxnanchal_compare', JSON.stringify(compareList));
  }, [compareList]);

  const addToCompare = (product) => {
    if (compareList.some((p) => p.slug === product.slug || p.id === product.id)) {
      // remove if already in
      setCompareList((prev) => prev.filter((p) => p.slug !== product.slug && p.id !== product.id));
      return { added: false, message: 'Removed from comparison' };
    }

    if (compareList.length >= 3) {
      const msg = lang === 'hi' 
        ? 'आप एक बार में अधिकतम 3 उत्पादों की तुलना कर सकते हैं।' 
        : 'You can compare up to 3 products at a time.';
      alert(msg);
      return { added: false, maxReached: true, message: msg };
    }

    setCompareList((prev) => [...prev, product]);
    return { added: true, message: 'Added to comparison' };
  };

  const removeFromCompare = (identifier) => {
    setCompareList((prev) => prev.filter((p) => p.slug !== identifier && p.id !== identifier));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const isInCompare = (identifier) => {
    return compareList.some((p) => p.slug === identifier || p.id === identifier);
  };

  return (
    <CompareContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        count: compareList.length,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
