import React from 'react';
import './HamburgerNav.scss';
import { Link } from 'react-router-dom';
import menu from '../../../Components/Sidebar/menu';

const HamburgerNav = ({ open }: { open: boolean }) => {
  const logo = 'assets/banque_logo.svg';
  return (
    <nav className={`hamburger-nav ${open ? 'show' : 'hide'}`}>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="navlinks">
        {menu.navbar.map(item => (
          <Link to={item.link}>{item.linkName}</Link>
        ))}
      </div>
    </nav>
  );
};

export default HamburgerNav;
