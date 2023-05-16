import { createContext, useState } from 'react';

export const AuthContext = createContext( {} as any );

export const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    // Lógica de autenticação
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Lógica de logout
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};