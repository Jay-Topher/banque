import React, { lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import store from './store';
import Sidebar from './Components/Sidebar/Sidebar';
import Main from './Components/Main/Main';
import Usernav from './Components/Usernav/Usernav';
// import Dashboard from './Components/Dashboard/Dashboard';
import SuspenseBoundary from './common/Boundary/SuspenseBoundary';
import PrivateRoute from './Routing/PrivateRoute';
import RegisterCard from './Components/Register/RegisterCard';

const Dashboard = lazy(() => import('./Components/Dashboard/Dashboard'));

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <SuspenseBoundary>
            <Route exact path="/register" component={RegisterCard} />
          </SuspenseBoundary>
          <div className="App">
            <Sidebar />
            <Main>
              <SuspenseBoundary>
                <Usernav name="Jones Ogolo" />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </SuspenseBoundary>
            </Main>
          </div>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
