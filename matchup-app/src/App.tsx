import './styles/variables.scss';
import './App.style.scss';

import { Navegation } from './components/navegation/Navegation';
import { AuthContextProvider } from './context/AuthContext';
import { TranslateContext } from './context/TranslateContext';

function App() {
  return (
    <TranslateContext>
      <AuthContextProvider>
        <Navegation />
      </AuthContextProvider>
    </TranslateContext>
  );
}

export default App;