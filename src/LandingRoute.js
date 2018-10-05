import React from 'react';
import { Route } from 'react-router-dom';
import LoggedOutNav from './Components/Nav/LoggedOutNav';

const NotAuthenticatedRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest}
      render={(props) =>
        <div>
          <LoggedOutNav />
          <Component {...props} />
        </div>
      } />
  )}

export default NotAuthenticatedRoute;
