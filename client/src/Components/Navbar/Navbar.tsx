import React from 'react';
import './Navbar.scss';
import menu from '../Sidebar/menu';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const logo = 'assets/banque_logo_blue.svg';
  return (
    <nav className="navbar">
      <div className="container-fluid main-nav">
        <div className="logo">
          <img src={logo} alt="logo" className="logo" />
        </div>
        <div className="navlinks">
          {menu.navbar.map(item => (
            <NavLink to={item.link}>{item.linkName}</NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
