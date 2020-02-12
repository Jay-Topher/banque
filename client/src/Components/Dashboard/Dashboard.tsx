import React from 'react';
import './Dashboard.scss';
import Card from '../Card/Card';
import menu from '../Sidebar/menu';
import DashCards from './DashCards/DashCards';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>Overview and quick actions</p>
      <div className="main-content">
        <Card addClass="v-small main-summary">Account Summary</Card>

        {menu.dashCards.map(card => (
          <DashCards
            description={card.description}
            addClass={card.addClass}
            icon={card.icon}
            place={card.place}
            key={card.description}
          />
        ))}
        <Card addClass="v-small empty-space">Space</Card>
        <Card addClass="v-small history">History</Card>
      </div>
    </div>
  );
};

export default Dashboard;
