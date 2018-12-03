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
          fb
        </div>
        <div className="p-nav__items">
          <Link to="/dashboard" className="p-nav__item">
            <i className="fas fa-columns"></i>
            <div className="p-nav__item_sub">Home</div>
          </Link>
          <Link to="/add_account" className="p-nav__item">
            <i className="fas fa-money-check-alt"></i>
            <div className="p-nav__item_sub">Accounts</div>
          </Link>
          <Link to="/settings" className="p-nav__item">
            <i className="fa fa-cog"></i>
            <div className="p-nav__item_sub">Settings</div>
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
