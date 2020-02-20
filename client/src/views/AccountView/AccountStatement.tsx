import React from 'react';
import './AccountStatement.scss';
import Card from '../../Components/Card/Card';
import { currencyFormat } from '../../utils/helpers';
import {
  IState,
  ITransaction,
  IMiniHistoryProp,
  IUserState,
} from '../../react-app-env';
import { connect } from 'react-redux';

const AccountStatement = ({ transactions }: IMiniHistoryProp) => {
  console.log(transactions);
  return (
    <Card addClass="v-small account-history">
      <div className="table-heading">
        <p className="card-heading">Account Statement</p>
        {/* <input
          type="search"
          name="search"
          placeholder="Search"
          className="search"
        /> */}
        <p>Showing 1 - 15 of 15 transactions</p>
        <button>Download</button>
      </div>
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
    </Card>
  );
};

// const mapStateToProps = ({transactions}: IMiniHistoryProp) => ({
//   transactions
// })

export default AccountStatement;
