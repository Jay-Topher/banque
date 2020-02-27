import React from 'react';
import Card from '../../Components/Card/Card';
import './Accountview.scss';
import UserDetails from '../../common/UserDetails/UserDetails';
import { connect } from 'react-redux';
import { IState } from '../../react-app-env';
import AccountStatement from './AccountStatement';
import { currencyFormat } from '../../utils/helpers';

function AccountView({ user }: IState) {
  return (
    <div className="account-view">
      <h2>Accounts</h2>
      <p>Overview</p>
      <div className="account-view-grid">
        <Card addClass="v-small">
          <div className="account-heading">
            <div className="account-heading-text">Account Information</div>
            <div className="account-heading-select">
              <select className="select-menu">
                <option value="Select Account">Select Account</option>
                <option value="Savings Account">Savings Account</option>
                <option value="Current Account">Current Account</option>
              </select>
            </div>
          </div>
          <UserDetails
            accountBalance={currencyFormat(user.account!.accountBalance)}
            accountName={`${user.user!.firstName} ${user.user!.lastName}`}
            accountNumber={user.account!.accountNumber}
            more={true}
          />
        </Card>
        <AccountStatement transactions={user.transactions} />
      </div>
    </div>
  );
}

const mapStateToProps = (state: IState) => ({
  user: state.user,
});
export default connect(mapStateToProps)(AccountView);
