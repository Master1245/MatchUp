import './App.style.scss';
import { Navegation } from './components/navegation/Navegation';
import { Translate } from './context/TranslateContext';

function App() {
  
  return (
    <Translate>
      <Navegation />
    </Translate>
  );
}

export default App;