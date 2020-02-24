import React from 'react';
import './TransferHistory.scss';
import Card from '../Card/Card';
import { currencyFormat } from '../../utils/helpers';

const TransferHistory = () => {
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
        <tr>
          <td>{Date.now()}</td>
          <td>{currencyFormat(5000)}</td>
          <td>{'0015252594'}</td>
          <td>{'CREDIT'}</td>
          <td>{'School fees'}</td>
        </tr>
      </table>
    </Card>
  );
};

export default TransferHistory;
