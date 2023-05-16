import './App.style.scss';
import { Navegation } from './components/navegation/Navegation';
import { AuthContext } from './context/AuthContext';
import { TranslateContext } from './context/TranslateContext';

function App() {
  
  return (
    <TranslateContext>
      <AuthContext>
        <Navegation />
      </AuthContext>
    </TranslateContext>
  );
}

export default App;