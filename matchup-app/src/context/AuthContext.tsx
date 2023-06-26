import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { LoadingContext } from './LoadingContext';
import { AlertContext } from './AlertContext';
import { axiosLogin, axiosLogout } from '../api/requests/user';

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

  useEffect(() => {
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(storedIsAuthenticated ? JSON.parse(storedIsAuthenticated) : false);
  }, []);

  const login = async (username:string, password:string) => {
    openLoading();
    try{
      const response = await axiosLogin(username, password);

      console.log(response);

      setToken(response.access_token);
      setIsAdministrator(response.user.is_admin);
      //setUser(response.user);

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
    axiosLogout().then((response) => {
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
        login,
        logout,
      }}
    >
    {children}
  </AuthContext.Provider>
  );
};