import React from 'react';
import './ThirdSection.scss';
import Icon from '../../Icomoon/icon';

const ThirdSection = () => {
  const steps = [
    'Register an account',
    'Fund your wallet',
    'Make Transactions',
  ];
  return (
    <section className="third-section">
      <div className="container-fluid">
        <h3 className="heading">How It Works</h3>
        <div className="third-section-container">
          <div className="third-section-photo">
            <img
              src="https://res.cloudinary.com/winter-cake/image/upload/c_scale,w_500/v1582379558/banque/undraw_wallet_aym5_rlquny.svg"
              alt="how it works"
            />
          </div>
          <div className="third-section-text">
            <h4>Steps</h4>
            <ul>
              {steps.map(step => (
                <li className="list" key={step}>
                  <Icon icon="wink2" className="icon" />
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThirdSection;
