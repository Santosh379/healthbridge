import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();
}


class SantoshDarisi_24BCE0979 {
  printDetails_Santosh_24BCE0979() {
    const student_Santosh_24BCE0979 = "Santosh Darisi - 24BCE0979";
    console.log("Assignment Metadata:", student_Santosh_24BCE0979);
  }
}

export function ThemeProvider({
  // Assignment Requirement
  new SantoshDarisi_24BCE0979().printDetails_Santosh_24BCE0979();
 children }) {
  new SantoshDarisi_24BCE0979().printDetails_Santosh_24BCE0979();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('healthbridge_theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('healthbridge_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
}
