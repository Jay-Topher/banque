import React, { lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import SuspenseBoundary from './common/Boundary/SuspenseBoundary';
import PrivateRoute from './Routing/PrivateRoute';
import Main from './Components/Main/Main';
import Sidebar from './Components/Sidebar/Sidebar';
import Usernav from './Components/Usernav/Usernav';
import TransferView from './views/TransferView/TransferView';

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
          <Route exact path="/user" component={UserView} />
        </Switch>
      </SuspenseBoundary>
      {/* /////////////////////////////development//////////////////////////////////////// */}
      {/* <div className="App">
        <Sidebar />
        <Main>
          <Usernav />
          <TransferView />
        </Main>
      </div> */}
    </Router>
  );
};

export default App;
