import React from 'react';
import './Dashboard.scss';
import Card from '../Card/Card';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>Overview and quick actions</p>
      <div className="main-content">
        <Card addClass="v-small">Hello</Card>
      </div>
    </div>
  );
};

export default Dashboard;
