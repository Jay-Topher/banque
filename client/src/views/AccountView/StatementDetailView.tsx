import React from 'react';
import './Accountview.scss';
import { connect } from 'react-redux';
import { IState } from '../../react-app-env';
import AccountStatement from './AccountStatement';

function StatementDetailView({ user }: IState) {
  return (
    <div className="statement-view">
      <h2>Account Statement</h2>
      <p>Your account statement</p>
      <div className="statement-view-grid">
        <div className="account-heading-select">
          <select className="select-menu">
            <option value="Select Account">Select Account</option>
            <option value="Savings Account">Savings Account</option>
            <option value="Current Account">Current Account</option>
          </select>
        </div>
        <AccountStatement transactions={user.transactions} />
      </div>
    </div>
  );
}

const mapStateToProps = (state: IState) => ({
  user: state.user,
});
export default connect(mapStateToProps)(StatementDetailView);
