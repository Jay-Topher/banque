import React from 'react';
import { IMiniHistoryProp } from '../../react-app-env';
import { currencyFormat } from '../../utils/helpers';

export default function Table({ transactions }: IMiniHistoryProp) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>Transaction type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction: any) => (
          <tr>
            <td>{transaction.transactionDate}</td>
            <td>{currencyFormat(transaction.transactionAmount)}</td>
            <td>{transaction.transactionType}</td>
            <td>{transaction.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
