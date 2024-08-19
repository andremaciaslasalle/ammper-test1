import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="mb-4">¡Bienvenido!</h1>
        <p className="lead">
          Este es el primer caso de prueba elaborado por André J. Macías Rodríguez para <a href="https://ammper.com/" target='_blank' className="ml-1">Ammper</a>
        </p>
      </div>
      <nav className="mt-4">
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/estado_de_cuenta" className="text-decoration-none">Estado de cuenta</Link>
          </li>
          <li className="list-group-item">
            <Link to="/tablero" className="text-decoration-none">Tablero</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;