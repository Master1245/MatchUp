import { createContext, useState, useEffect, ReactNode } from 'react';

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
};

export const Translate = createContext<LanguageContextType>({
  language: '',
  setLanguage: () => {},
});

type TranslateContextProps = {
  children: ReactNode;
};

export const TranslateContext = ({ children }: TranslateContextProps) => {
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
    <Translate.Provider value={contextValue}>
      {children}
    </Translate.Provider>
  );
};
