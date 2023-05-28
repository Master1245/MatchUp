import { createContext, useEffect, useState, ReactNode } from 'react';
import { axios_login } from '../api/requests/login';

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAdministrator: false,
  login: () => {},
  logout: () => {},
});

interface AuthContextType {
  isAuthenticated: boolean;
  isAdministrator: boolean;
  login: (username:string, password:string) => void;
  logout: () => void;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    return storedAuth ? JSON.parse(storedAuth) : false;
  });
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem('token');
    return storedToken ? storedToken : '';
  });
  const [isAdministrator, setIsAdministrator] = useState(() => {
    const storedIsAdministrator = localStorage.getItem('isAdministrator');
    return storedIsAdministrator ? JSON.parse(storedIsAdministrator) : false;
  });

  const login = (username:string, password:string) => {
    axios_login(username, password).then((response) => {
      console.log(response);

      setToken(response.token);
      setIsAdministrator(response.user.is_admin);

      setIsAuthenticated(true);
    }, (error) => {
      console.log(error);
    });
  };

  const logout = () => {
    setToken('');

    setIsAdministrator(false);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    localStorage.setItem('token', token);
    localStorage.setItem('isAdministrator', JSON.stringify(isAdministrator));
  }, [isAuthenticated, token, isAdministrator]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdministrator, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};