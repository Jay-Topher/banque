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
        <Route exact path="/register" component={RegisterCard} />
        <div className="App">
          <Sidebar />
          <Main>
            <Usernav name="Jones Ogolo" />
            <SuspenseBoundary>
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                {/* <Dashboard />
                </PrivateRoute> */}

                {/*<Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/dashboard" component={Dashboard} /> */}
              </Switch>
            </SuspenseBoundary>
          </Main>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
