import React from 'react';
import './FirstSection.scss';
import { Link } from 'react-router-dom';

const FirstSection = () => {
  return (
    <section className="first-section">
      <div className="container-fluid">
        <div className="first-section-container">
          <div className="first-section-text">
            <h2>Flexible Saving</h2>
            <p>
              Banque helps all consumers save and transfer money seamlessly and
              securely without charges while at the comfort of your home.
            </p>
            <Link to="/register">Get Started</Link>
          </div>
          <div className="first-section-photo">
            <img
              src="https://res.cloudinary.com/winter-cake/image/upload/c_scale,w_500/v1582379556/banque/undraw_Savings_dwkw_nnoy63.svg"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstSection;
