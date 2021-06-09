import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Dashboard from '../Dashboard';
import Login from '../Login';
import Register from '../Register';
import {Provider} from 'react-redux';
import {store} from '../../../config/redux';
import Redux from '../Redux';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
            <Route path='/' exact component={Login} />   
            <Route path='/dashboard' component={Dashboard} />  
            <Route path='/register' component={Register} />
            <Route path="/redux" component={Redux} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
