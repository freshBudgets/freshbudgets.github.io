import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { _noop } from 'lodash';

import { logoutUser } from '../../Actions';
import './_pillar.nav.source.scss';

const propTypes = {
  logoutUser: PropTypes.func,
  isAuthenticated: PropTypes.bool,
}

const defaultProps = {
  logoutUser: _noop,
  isAuthenticated: true,
}

class LoggedInNav extends Component {
  render() {
    if(!this.props.isAuthenticated) return(<Redirect to="/login" />);

    return (
      <nav className="p-nav p-nav--logged_in">
        <div className="p-nav__logo">
          FreshBudgets
        </div>
        <div className="p-nav__items">
          <Link to="/dashboard" className="p-nav__item">
            Dashboard
          </Link>
          <div className="p-nav__item" onClick={() => this.props.logoutUser()}>
            Logout
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  const { isAuthenticated } = state.user;

  return { isAuthenticated }
};

const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => dispatch(logoutUser())
});

LoggedInNav.propTypes = propTypes;
LoggedInNav.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(LoggedInNav)
