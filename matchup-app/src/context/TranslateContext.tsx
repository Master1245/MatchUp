import { createContext, useState, useEffect } from 'react';

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
};

export const TranslateContext = createContext<LanguageContextType>({
  language: '',
  setLanguage: () => {},
});

export const Translate = ({ children }: any) => {
  const [language, setLanguage] = useState('');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setLanguage(storedLanguage);
    } else {
      setLanguage(navigator.language);
    }
  }, []);

  const updateLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const contextValue: LanguageContextType = {
    language,
    setLanguage: updateLanguage,
  };

  return (
    <TranslateContext.Provider value={contextValue}>
      {children}
    </TranslateContext.Provider>
  );
};
