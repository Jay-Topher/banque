import React, { Suspense } from 'react';
import './UserView.scss';
import { Route, Switch } from 'react-router';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Main from '../../Components/Main/Main';
import Usernav from '../../Components/Usernav/Usernav';
import Dashboard from '../../Components/Dashboard/Dashboard';
import AccountView from '../AccountView/AccountView';
import SuspenseBoundary from '../../common/Boundary/SuspenseBoundary';
import TransferView from '../TransferView/TransferView';

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
