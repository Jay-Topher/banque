import React from 'react';
import './FooterNav.scss';
import menu from '../../Sidebar/menu';
import { NavLink } from 'react-router-dom';

const FooterNav = () => {
  const logo = 'assets/banque_logo_blue.svg';
  return (
    <nav className="footer-nav">
      <div className="footer-nav-logo">
        <img src={logo} alt="logo" className="logo" />
      </div>
      <ul className="footer-nav-links">
        {menu.footerNav.map(item => (
          <li key={item.name}>
            <NavLink to={item.link}>{item.name}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default FooterNav;
