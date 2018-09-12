import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './Functions/UserManagement';

const NotAuthenticatedRoute = ({component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => isAuthenticated() === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
    />
  )
}

export default NotAuthenticatedRoute;
