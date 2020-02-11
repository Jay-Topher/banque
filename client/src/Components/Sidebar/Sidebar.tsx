import React from 'react';
import './Sidebar.scss';
import menu from './menu';
import MenuItem from './MenuItem/MenuItem';

const Sidebar = () => {
  const logo = '/assets/banque_logo.svg';
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <ul className="menu_list">
        {menu.user.map(item => (
          <MenuItem
            icon={item.icon}
            title={item.title}
            place={item.link}
            key={item.title}
          />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
