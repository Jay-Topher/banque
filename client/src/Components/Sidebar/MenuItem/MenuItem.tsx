import React from 'react';
import './MenuItem.scss';
import { Link } from 'react-router-dom';
import { IMenuProp } from '../../../react-app-env';
import Icon from '../../../Icomoon/icon';

const MenuItem = ({ icon, title, place }: IMenuProp) => {
  return (
    <li className="menu-item">
      <Link to={place} className="menu-item-link" id={title}>
        {/* <img src={icon} alt="icon" className="photo" /> */}
        <Icon icon={icon} className="photo" />
        <p>{title}</p>
      </Link>
    </li>
  );
};

export default MenuItem;
