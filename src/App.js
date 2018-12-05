import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './Public/App.scss';
import { isAuthenticated } from './Functions/UserManagement';
import LandingRoute from './LandingRoute';
import AuthenticatedRoute from './AuthenticatedRoute';
import AuthenticatedRouteNoNav from './AuthenticatedRouteNoNav';
import NotAuthenticatedRoute from './NotAuthenticatedRoute';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import VerifyPhone from './Pages/VerifyPhone';
import Accounts from './Pages/Accounts';
import Recurring from './Pages/Recurring';
import Dashboard from './Pages/Dashboard';
import Budget from './Pages/Budget';
import CreateBudget from './Pages/CreateBudget';
import Settings from './Pages/Settings';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <LandingRoute exact path="/" component={ Home } />

          <NotAuthenticatedRoute authed={ isAuthenticated() } path="/login" component={ Login } />
          <NotAuthenticatedRoute authed={ isAuthenticated() } path="/register" component={ Register } />

          <AuthenticatedRouteNoNav authed={ isAuthenticated() } path="/verify_phone" component={ VerifyPhone } />
          <AuthenticatedRoute authed={ isAuthenticated() } path="/accounts" component={ Accounts } />
          <AuthenticatedRoute authed={ isAuthenticated() } path="/recurring" component={ Recurring } />
          <AuthenticatedRoute authed={ isAuthenticated() } path='/dashboard' component={ Dashboard } />
          <AuthenticatedRoute authed={ isAuthenticated() } path='/budget/:id' component={ Budget } />
          <AuthenticatedRoute authed={ isAuthenticated() } path='/create_budget' component={ CreateBudget } />
          <AuthenticatedRoute authed={ isAuthenticated() } path='/settings' component={ Settings } />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
