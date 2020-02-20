import React, { lazy } from 'react';
import './UserView.scss';
import { Route, Switch } from 'react-router';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Main from '../../Components/Main/Main';
import Usernav from '../../Components/Usernav/Usernav';
import SuspenseBoundary from '../../common/Boundary/SuspenseBoundary';
// import Dashboard from '../../Components/Dashboard/Dashboard';

const Dashboard = lazy(() => import('../../Components/Dashboard/Dashboard'));
const TransferView = lazy(() => import('../TransferView/TransferView'));

const UserView = () => {
  return (
    <SuspenseBoundary>
      <div className="UserView">
        <Sidebar />
        <Main>
          <Usernav name="Jones Ogolo" />
          <Switch>
            <Route exact path="/user/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="user/transfers">
              <TransferView />
            </Route>
          </Switch>
        </Main>
      </div>
    </SuspenseBoundary>
  );
};

export default UserView;
