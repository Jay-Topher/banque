import React from 'react';
import './Usernav.scss';
import { IUsernavProp } from '../../react-app-env';

const Usernav = ({ name }: IUsernavProp) => {
  return (
    <nav className="usernav">
      <div className="name">
        <p>Welcome, {name}</p>
      </div>
      <div className="logout">Logout</div>
    </nav>
  );
};

export default Usernav;
