import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './Functions/UserManagement';

const AuthenticatedRouteNoNav = ({component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => isAuthenticated() === true
        ? <Component {...props} />
        : <Redirect to='/login' />}
    />
  )
}

export default AuthenticatedRouteNoNav;
