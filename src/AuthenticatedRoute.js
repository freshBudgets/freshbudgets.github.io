import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './Functions/UserManagement';
import Nav from './Components/Nav';

const AuthenticatedRoute = ({component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => isAuthenticated() === true
        ?
        <div>
          <Nav />
          <Component {...props} />
        </div>
        : <Redirect to='/login' />}
    />
  )
}

export default AuthenticatedRoute;
