import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import './Public/App.scss';
import { isAuthenticated } from './Functions/UserManagement';
import AuthenticatedRoute from './AuthenticatedRoute';
import NotAuthenticatedRoute from './NotAuthenticatedRoute';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={ Home } />

          <NotAuthenticatedRoute authed={ isAuthenticated() } path="/login" component={ Login } />
          <NotAuthenticatedRoute authed={ isAuthenticated() } path="/register" component={ Register } />
          <AuthenticatedRoute authed={ isAuthenticated() } path='/dashboard' component={ Dashboard } />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
