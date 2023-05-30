import { createContext, useEffect, useState, ReactNode } from 'react';
import { axios_logout } from '../api/requests/logout';
import { axios_login } from '../api/requests/login';

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAdministrator: false,
  user: {},
  login: () => {},
  logout: () => {},
});

interface AuthContextType {
  isAuthenticated: boolean;
  isAdministrator: boolean;
  user: any;
  login: (username:string, password:string) => void;
  logout: () => void;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem('token');
    return storedToken ? storedToken : '';
  });
  const [isAdministrator, setIsAdministrator] = useState(() => {
    const storedIsAdministrator = localStorage.getItem('isAdministrator');
    return storedIsAdministrator ? JSON.parse(storedIsAdministrator) : false;
  });
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('user');  
    setUser(storedUser ? JSON.parse(storedUser) : {});
    setIsAuthenticated(storedIsAuthenticated ? JSON.parse(storedIsAuthenticated) : false);
  }, []);

  const login = (username:string, password:string) => {
    axios_login(username, password).then((response) => {
      console.log(response);

      setToken(response.access_token);
      setIsAdministrator(response.user.is_admin);
      setUser(response.user);

      setIsAuthenticated(true);
    }, (error) => {
      console.log(error);
    });
  };

  const logout = () => {
    setToken('');

    setIsAdministrator(false);
    setIsAuthenticated(false);

    axios_logout().then((response) => {
      console.log(response);
    }
    , (error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    localStorage.setItem('token', token);
    localStorage.setItem('isAdministrator', JSON.stringify(isAdministrator));
    localStorage.setItem('user', JSON.stringify(user));
  }, [isAuthenticated, token, isAdministrator, user]);

  useEffect(() => {
    const handleFocus = () => {
      console.log(isAuthenticated);
      if (!isAuthenticated ) {
        logout();
      }
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdministrator,
        user,
        login,
        logout,
      }}
    >
    {children}
  </AuthContext.Provider>
  );
};