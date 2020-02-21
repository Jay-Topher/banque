import React from 'react';
import { Link } from 'react-router-dom';
import './UserDetails.scss';
import { IUserDetails } from '../../react-app-env';

const UserDetails = ({
  accountBalance,
  accountName,
  accountNumber,
  more,
}: IUserDetails) => {
  return (
    <div className="user-details">
      <div className="heading">{!more ? <h4>Account Summary</h4> : null}</div>
      <div className="body">
        <div className="current-balance">
          <p className="balance">{accountBalance}</p>
          <p className="current">current balance</p>
        </div>
        <div className="other-details">
          <p className="name">{accountName}</p>
          <p className="label">Account Name</p>
          <p className="name">{accountNumber}</p>
          <p className="label">Account Number</p>
        </div>
        {more ? (
          <div className="more-details">
            <p className="name">Savings Account</p>
            <p className="label">Account Type</p>
            <p className="name">
              NGN <b>Naira</b>
            </p>
            <p className="label">Currency</p>
          </div>
        ) : null}
      </div>
      {!more ? (
        <div className="footer">
          <Link to="/">More Details</Link>
        </div>
      ) : null}
    </div>
  );
};

export default UserDetails;
