import React, { lazy } from 'react';
import './UserView.scss';
import { Route, Switch } from 'react-router';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Main from '../../Components/Main/Main';
import Usernav from '../../Components/Usernav/Usernav';
import SuspenseBoundary from '../../common/Boundary/SuspenseBoundary';

const Dashboard = lazy(() => import('../../Components/Dashboard/Dashboard'));
const AccountView = lazy(() => import('../AccountView/AccountView'));
const TransferView = lazy(() => import('../TransferView/TransferView'));
const StatementDetailView = lazy(() =>
  import('../AccountView/StatementDetailView'),
);

const UserView = () => {
  return (
    <div className="UserView">
      <Sidebar />
      <Main>
        <Usernav />
        <SuspenseBoundary>
          <Switch>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/dashboard/account">
              <AccountView />
            </Route>
            <Route exact path="/dashboard/statement">
              <StatementDetailView />
            </Route>
            <Route exact path="/dashboard/transfers">
              <TransferView />
            </Route>
          </Switch>
        </SuspenseBoundary>
      </Main>
    </div>
  );
};

export default UserView;
