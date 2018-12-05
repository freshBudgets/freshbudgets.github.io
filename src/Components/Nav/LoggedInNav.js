import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import './_pillar.nav.source.scss';

const propTypes = {}
const defaultProps = {}

class LoggedInNav extends Component {
  render() {
    return (
      <nav className="p-nav p-nav--logged_in">
        <div className="p-nav__logo">
          fb
        </div>
        <div className="p-nav__items">
          <Link to="/dashboard" className="p-nav__item">
            <i className="fas fa-list"></i>
            <div className="p-nav__item_sub">Budgets</div>
          </Link>
          <Link to="/recurring" className="p-nav__item">
            <i className="fas fa-sync-alt"></i>
            <div className="p-nav__item_sub">Recurring</div>
          </Link>
          <Link to="/accounts" className="p-nav__item">
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
