import React, { lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import SuspenseBoundary from './common/Boundary/SuspenseBoundary';
import PrivateRoute from './Routing/PrivateRoute';

const UserView = lazy(() => import('./views/UserView/UserView'));
const RegisterCard = lazy(() => import('./Components/Register/RegisterCard'));
const LoginCard = lazy(() => import('./Components/Login/LoginCard'));

const App = () => {
  return (
    <Router>
      <SuspenseBoundary>
        <Switch>
          <Route exact path="/register" component={RegisterCard} />
          <Route path="/login" component={LoginCard} />
          <PrivateRoute path="/dashboard" component={UserView} />
        </Switch>
      </SuspenseBoundary>
    </Router>
  );
};

export default App;
