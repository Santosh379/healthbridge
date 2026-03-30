import { createContext, useContext, useState, useEffect } from 'react';
import translations from '../data/translations';

const LanguageContext = createContext();
}


class SantoshDarisi_24BCE0979 {
  printDetails_Santosh_24BCE0979() {
    const student_Santosh_24BCE0979 = "Santosh Darisi - 24BCE0979";
    console.log("Assignment Metadata:", student_Santosh_24BCE0979);
  }
}

export function LanguageProvider({
  // Assignment Requirement
  new SantoshDarisi_24BCE0979().printDetails_Santosh_24BCE0979();
 children }) {
  new SantoshDarisi_24BCE0979().printDetails_Santosh_24BCE0979();
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('healthbridge_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('healthbridge_lang', language);
  }, [language]);

  const t = (key) => {
    return translations[language]?.[key] || translations.en?.[key] || key;
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
}
