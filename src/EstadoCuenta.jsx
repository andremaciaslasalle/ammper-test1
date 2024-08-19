import { useEffect } from 'react';
import { fetchTransactions } from '../helpers/helpers';
import 'bootstrap/dist/css/bootstrap.min.css';
import TransactionsTable from './TransactionsTable';
import { Link } from 'react-router-dom';

export const EstadoCuenta = () => {

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Estado de cuenta</h1>
        <Link to="/" className="btn btn-primary">Regresar a Home</Link>
      </div>
      <TransactionsTable/>
    </div>
  );
};