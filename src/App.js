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
import VerifyPhone from './Pages/VerifyPhone';
import Dashboard from './Pages/Dashboard';
import Budget from './Pages/Budget';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={ Home } />

          <NotAuthenticatedRoute authed={ isAuthenticated() } path="/login" component={ Login } />
          <NotAuthenticatedRoute authed={ isAuthenticated() } path="/register" component={ Register } />

          <AuthenticatedRoute authed={ isAuthenticated() } path="/verify_phone" component={ VerifyPhone } />
          <AuthenticatedRoute authed={ isAuthenticated() } path='/dashboard' component={ Dashboard } />
          <AuthenticatedRoute authed={ isAuthenticated() } path='/budget/:id' component={ Budget } />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
