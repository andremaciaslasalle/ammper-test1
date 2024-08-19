import React, { useEffect, useState } from 'react';
import { fetchTransactions } from '../helpers/helpers';
import 'bootstrap/dist/css/bootstrap.min.css';

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState('value_date');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    const getTransactions = async () => {
      const data = await fetchTransactions();
      setTransactions(data.results);
      setLoading(false);
    };
    getTransactions();
  }, []);

  const handleSort = (field) => {
    const order = (sortField === field && sortOrder === 'asc') ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (sortField === 'value_date') {
      return sortOrder === 'asc' ? new Date(aValue) - new Date(bValue) : new Date(bValue) - new Date(aValue);
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Transacciones</h2>
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <table className="table table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th onClick={() => handleSort('value_date')} style={{ cursor: 'pointer' }}>Date</th>
              <th onClick={() => handleSort('description')} style={{ cursor: 'pointer' }}>Description</th>
              <th onClick={() => handleSort('amount')} style={{ cursor: 'pointer' }}>Amount</th>
              <th onClick={() => handleSort('balance')} style={{ cursor: 'pointer' }}>Balance</th>
              <th onClick={() => handleSort('type')} style={{ cursor: 'pointer' }}>Type</th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map(transaction => (
              <tr key={transaction.id} className={transaction.type === 'INFLOW' ? 'table-success' : transaction.type === 'OUTFLOW' ? 'table-danger' : ''}>
                <td>{transaction.value_date}</td>
                <td>{(transaction?.description) ? transaction.description : "ND" } - {transaction.merchant.name}</td>
                <td>{transaction.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                <td>{transaction.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                <td>{transaction.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionsTable;