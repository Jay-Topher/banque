import React from 'react';
import './UserView.scss';
import { Route, Switch } from 'react-router';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Main from '../../Components/Main/Main';
import Usernav from '../../Components/Usernav/Usernav';
import Dashboard from '../../Components/Dashboard/Dashboard';

const UserView = () => {
  return (
    <div className="UserView">
      <Sidebar />
      <Main>
        <Usernav />
        <Switch>
          <Route exact path="/user">
            <Dashboard />
          </Route>
        </Switch>
      </Main>
    </div>
  );
};

export default UserView;
