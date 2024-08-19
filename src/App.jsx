import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { EstadoCuenta } from './EstadoCuenta';
import Home from './Home';
import { Tablero } from './Tablero';
import NotFound from './NotFound';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/estado_de_cuenta" element={<EstadoCuenta />} />
        <Route path="/tablero" element={<Tablero />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;