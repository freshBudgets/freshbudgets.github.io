import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './Functions/UserManagement';
import Nav from './Components/Nav';

const AuthenticatedRoute = ({component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated() === 2) {
          return (
            <div className="c-site">
              <Nav />
              <div className="c-content_wrapper">
                <Component {...props} />
              </div>
            </div>
          )
        } else if (isAuthenticated() === 1) {
          return (<Redirect to='/verify_phone' />)
        } else if (isAuthenticated() === 0) {
          return (<Redirect to='/login' />)
        }
      }}
    />
  )
}

export default AuthenticatedRoute;
