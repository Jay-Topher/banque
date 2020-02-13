import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
// import RegisterCard from './Components/Register/RegisterCard';
import store from './store';
import Sidebar from './Components/Sidebar/Sidebar';
import Main from './Components/Main/Main';
import Usernav from './Components/Usernav/Usernav';
import Dashboard from './Components/Dashboard/Dashboard';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Sidebar />
          {/* <RegisterCard /> */}
          <Main>
            <Usernav name="Jones Ogolo" />
            <Dashboard />
          </Main>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
