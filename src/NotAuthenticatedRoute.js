import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './Functions/UserManagement';

const NotAuthenticatedRoute = ({component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated() === 2) {
          return (<Redirect to='/dashboard' />)
        } else if (isAuthenticated() === 1) {
          if (props.location.pathname === '/verify_phone') return <Component {...props} />
          else return <Redirect to='/verify_phone' />
        } else if (isAuthenticated() === 0) {
          return (<Component {...props} />)
        }
      }}
    />
  )
}

export default NotAuthenticatedRoute;
