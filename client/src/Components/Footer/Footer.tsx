import React from 'react';
import './Footer.scss';
import FooterNav from './FooterNav/FooterNav';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="footer-container">
          <FooterNav />
          <div className="footer-links">
            <Link to="/privacypolicy">Privacy Policy</Link>
            <span>&nbsp;</span>
            <Link to="/termsandconditions">Terms and Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
