import React, { useState } from 'react';
import './AccountStatement.scss';
import Card from '../../Components/Card/Card';
import { currencyFormat } from '../../utils/helpers';
import { IMiniHistoryProp } from '../../react-app-env';
import Pagination from 'react-js-pagination';

const AccountStatement = ({ transactions }: IMiniHistoryProp) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(5);
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = transactions.slice(indexOfFirstData, indexOfLastData);

  const paginate = (page: number) => {
    setCurrentPage(page);
  };
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
        <div className="shows">
          Showing {indexOfFirstData + 1} to {indexOfLastData} of{' '}
          {transactions.length} entries
        </div>
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
      <Pagination
        hideFirstLastPages
        activePage={currentPage}
        itemsCountPerPage={dataPerPage}
        pageRangeDisplayed={2}
        prevPageText="Previous"
        nextPageText="Next"
        itemClass="page-item"
        linkClass="page-link"
        totalItemsCount={transactions.length}
        onChange={paginate}
      />
    </Card>
  );
};

// const mapStateToProps = ({transactions}: IMiniHistoryProp) => ({
//   transactions
// })

export default AccountStatement;
