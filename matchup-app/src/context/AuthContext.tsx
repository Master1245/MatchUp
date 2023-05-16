import { createContext, useState } from 'react';

export const Auth = createContext( {} as any );

export const AuthContext = ({ children }: any) => {
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
    <Auth.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </Auth.Provider>
  );
};