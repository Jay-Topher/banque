import React from 'react';
import { Link } from 'react-router-dom';
import './UserDetails.scss';
import { IUserDetails } from '../../react-app-env';

const UserDetails = ({
  accountBalance,
  accountName,
  accountNumber,
}: IUserDetails) => {
  return (
    <div className="user-details">
      <div className="heading">
        <h4>Account Summary</h4>
      </div>
      <div className="body">
        <div className="current-balance">
          <p className="balance">₦{accountBalance}</p>
          <p className="current">current balance</p>
        </div>
        <div className="other-details">
          <p className="name">{accountName}</p>
          <p className="label">Account Name</p>
          <p className="name">{accountNumber}</p>
          <p className="label">Account Number</p>
        </div>
      </div>
      <div className="footer">
        <Link to="/">More Details</Link>
      </div>
    </div>
  );
};

export default UserDetails;
