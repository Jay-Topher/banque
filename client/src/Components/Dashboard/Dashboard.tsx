import React from 'react';
import './Dashboard.scss';
import Card from '../Card/Card';
import menu from '../Sidebar/menu';
import DashCards from './DashCards/DashCards';
import UserDetails from '../../common/UserDetails/UserDetails';
import MiniHistory from '../MiniHistory/MiniHistory';
import { connect } from 'react-redux';
import { IState } from '../../react-app-env';

const Dashboard = ({ user }: IState) => {
  if (user === null) {
    return <>Loading...</>;
  }
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>Overview and quick actions</p>
      <div className="main-content">
        <Card addClass="v-small main-summary">
          <UserDetails
            accountBalance={user.account!.accountBalance}
            accountName={`${user.user!.firstName} ${user.user!.lastName}`}
            accountNumber={user.account!.accountNumber}
          />
        </Card>

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
        <Card addClass="v-small history">
          <p className="history-heading">Recent Transactions</p>
          <MiniHistory transactions={user.transactions!} />
        </Card>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IState) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Dashboard);
