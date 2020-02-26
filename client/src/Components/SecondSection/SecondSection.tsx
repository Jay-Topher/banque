import React from 'react';
import './SecondSection.scss';
import Icon from '../../Icomoon/icon';
import menu from '../Sidebar/menu';

const SecondSection = () => {
  return (
    <section className="second-section">
      <div className="container-fluid">
        <div className="heading">
          <h2>Why Use Banque?</h2>
          <p>
            These and many other reasons are why we are the perfect fit for you.
          </p>
        </div>
        <div className="second-section-container">
          {menu.secondSection.map(item => (
            <div className="second-section-item">
              <Icon icon={item.icon} className="icon" />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecondSection;
