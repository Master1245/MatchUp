import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { axios_logout } from '../api/requests/logout';
import { axios_login } from '../api/requests/login';
import { LoadingContext } from './LoadingContext';
import { AlertContext } from './AlertContext';

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
  const { openLoading, closeLoading } = useContext(LoadingContext);
  const { openAlert, closeAlert } = useContext(AlertContext);

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

  const login = async (username:string, password:string) => {
    openLoading();
    try{
      const response = await axios_login(username, password);

      console.log(response);

      setToken(response.access_token);
      setIsAdministrator(response.user.is_admin);
      setUser(response.user);

      setIsAuthenticated(true);

      localStorage.setItem('isAuthenticated', "true");
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('isAdministrator', response.user.is_admin);
      localStorage.setItem('user', response.user);
    } catch (error: any) {
      await openAlert(error.response.data.detail, 'error');
    }
    closeLoading();
  };

  const logout = async () => {
    axios_logout().then((response) => {
      setToken('');
  
      setIsAdministrator(false);
      setIsAuthenticated(false);
    
      localStorage.setItem('isAuthenticated', '');
      localStorage.setItem('token', '');
      localStorage.setItem('isAdministrator', '');
      localStorage.setItem('user', '');
    }
    , (error) => {
      console.log(error);
    });
  };

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