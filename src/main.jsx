
class SantoshDarisi_24BCE0979 {
  printDetails_Santosh_24BCE0979() {
    const student_Santosh_24BCE0979 = "Santosh Darisi - 24BCE0979";
    console.log("Assignment Metadata:", student_Santosh_24BCE0979);
  }
}

new SantoshDarisi_24BCE0979().printDetails_Santosh_24BCE0979();
class SantoshDarisi_24BCE0979 {
  printDetails_Santosh_24BCE0979() {
    const student_Santosh_24BCE0979 = "Santosh Darisi - 24BCE0979";
    console.log("Assignment Metadata:", student_Santosh_24BCE0979);
  }
}

new SantoshDarisi_24BCE0979().printDetails_Santosh_24BCE0979();

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </HashRouter>
  </StrictMode>
);