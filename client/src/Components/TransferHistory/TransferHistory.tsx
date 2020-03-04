import React from 'react';
import './TransferHistory.scss';
import Card from '../Card/Card';
import { currencyFormat } from '../../utils/helpers';
import { ITransferHistory } from '../../react-app-env';

const TransferHistory = ({
  transactionHistory,
}: {
  transactionHistory: ITransferHistory[];
}) => {
  return (
    <Card addClass="v-small transfer-history">
      <div className="table-heading">
        <p className="card-heading">Transfer History</p>
        <input
          type="search"
          name="search"
          placeholder="Search"
          className="search"
        />
        <p>Showing 1 - 15 of 21 transfers</p>
      </div>
      <table className="table">
        <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>Recipient</th>
          <th>Transfer Type</th>
          <th>Description</th>
        </tr>
        {transactionHistory.map((transaction, index) => (
          <tr key={`${transaction.benefactor}${index}`}>
            <td>{transaction.transactionDate}</td>
            <td>{currencyFormat(transaction.transactionAmount)}</td>
            <td>{transaction.benefactor}</td>
            <td>{transaction.transactionType}</td>
            <td>{transaction.description || '-'}</td>
          </tr>
        ))}
      </table>
    </Card>
  );
};

export default TransferHistory;
