import { useState, useEffect } from 'react';
import { fetchTransactions, fetchLinks } from '../helpers/helpers';
import 'bootstrap/dist/css/bootstrap.min.css';

export const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [linksError, setLinksError] = useState(null);
  const [transactionsError, setTransactionsError] = useState(null);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        await fetchLinks();
      } catch (error) {
        setLinksError('Error leyendo links de la cuenta');
      }

      try {
        const response = await fetchTransactions();
        setTransactions(response.results);
      } catch (error) {
        setTransactionsError('Error leyendo transacciones de la cuenta');
      }
    };

    getTransactions();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Conexión a Belvo</h1>
      {linksError && (
        <div className="alert alert-danger" role="alert">
          {linksError}
        </div>
      )}
      {transactionsError && (
        <div className="alert alert-danger" role="alert">
          {transactionsError}
        </div>
      )}
      {!linksError && !transactionsError && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.value_date}</td>
                <td>{transaction.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};