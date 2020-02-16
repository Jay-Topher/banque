import React, { lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import SuspenseBoundary from './common/Boundary/SuspenseBoundary';
import PrivateRoute from './Routing/PrivateRoute';

const UserView = lazy(() => import('./views/UserView/UserView'));
const RegisterCard = lazy(() => import('./Components/Register/RegisterCard'));

const App = () => {
  return (
    <Router>
      <SuspenseBoundary>
        <Switch>
          <Route exact path="/register" component={RegisterCard} />
          <PrivateRoute exact path="/user" component={UserView} />
        </Switch>
      </SuspenseBoundary>
    </Router>
  );
};

export default App;
