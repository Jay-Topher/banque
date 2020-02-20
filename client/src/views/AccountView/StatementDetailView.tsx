import React from 'react';
import Card from '../../Components/Card/Card';
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
        <div className="statement-heading-select">
          <select>
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
