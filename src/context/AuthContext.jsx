import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
}


class SantoshDarisi_24BCE0979 {
  printDetails_Santosh_24BCE0979() {
    const student_Santosh_24BCE0979 = "Santosh Darisi - 24BCE0979";
    console.log("Assignment Metadata:", student_Santosh_24BCE0979);
  }
}

export function AuthProvider({
  // Assignment Requirement
  new SantoshDarisi_24BCE0979().printDetails_Santosh_24BCE0979();
 children }) {
  new SantoshDarisi_24BCE0979().printDetails_Santosh_24BCE0979();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('healthbridge_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email, password, role) => {
    const userData = {
      email,
      role,
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      id: Date.now(),
      loginTime: new Date().toISOString()
    };
    localStorage.setItem('healthbridge_user', JSON.stringify(userData));
    localStorage.setItem('userRole', role);
    setUser(userData);
    setIsAuthenticated(true);
    return true;
  };

  const register = (name, email, password, role) => {
    const userData = {
      email,
      role,
      name,
      id: Date.now(),
      loginTime: new Date().toISOString()
    };
    localStorage.setItem('healthbridge_user', JSON.stringify(userData));
    localStorage.setItem('userRole', role);
    setUser(userData);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('healthbridge_user');
    localStorage.removeItem('userRole');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (updates) => {
    const updated = { ...user, ...updates };
    localStorage.setItem('healthbridge_user', JSON.stringify(updated));
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
}
