import React, { Component } from 'react';
// import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
// import { _noop } from 'lodash';

import './_pillar.nav.source.scss';

const propTypes = {
}

const defaultProps = {
}

class LoggedInNav extends Component {
  render() {
    return (
      <nav className="p-nav p-nav--logged_in">
        <div className="p-nav__logo">
          FreshBudgets
        </div>
        <div className="p-nav__items">
          <Link to="/dashboard" className="p-nav__item">
            Dashboard
          </Link>
          <Link to="/create_budget" className="p-nav__item">
            Create Budget
          </Link>
          <Link to="/add_account" className="p-nav__item">
            Link Account
          </Link>
          <Link to="/settings" className="p-nav__item">
            Settings
          </Link>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
});

LoggedInNav.propTypes = propTypes;
LoggedInNav.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(LoggedInNav)
