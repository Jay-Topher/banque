import React, { useState } from 'react';
import './AccountStatement.scss';
import Card from '../../Components/Card/Card';
import { IMiniHistoryProp } from '../../react-app-env';
import Pagination from 'react-js-pagination';
import Table from './Table';

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
          {transactions.length} transactions
        </div>
        <button className="download__btn">Download</button>
      </div>
      {transactions.length === 0 ? (
        <div className="no__transaction">No Transactions</div>
      ) : (
        <Table transactions={currentData} />
      )}
      <div className="pagination__container">
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
      </div>
    </Card>
  );
};

export default AccountStatement;
