import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import RegisterCard from './Components/Register/RegisterCard';
import store from './store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <RegisterCard />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
