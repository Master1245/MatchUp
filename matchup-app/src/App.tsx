import './styles/variables.scss';
import './App.style.scss';

import { Navegation } from './components/navegation/Navegation';
import { AuthContextProvider } from './context/AuthContext';
import { TranslateContext } from './context/TranslateContext';
import { LoadingContextProvider } from './context/LoadingContext';
import { AlertContextProvider } from './context/AlertContext';
import { UserContextProvider } from './context/UserContext';

function App() {
  return (
    <TranslateContext>
      <AlertContextProvider>
        <LoadingContextProvider>
          <UserContextProvider>
            <AuthContextProvider>
              <Navegation />
            </AuthContextProvider>
          </UserContextProvider>
        </LoadingContextProvider>
      </AlertContextProvider>
    </TranslateContext>
  );
}

export default App;