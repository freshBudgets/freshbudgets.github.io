import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MobileNav from './MobileNav';
import Items from './Items';

import './_pillar.nav.source.scss';

const propTypes = {}
const defaultProps = {}

class LoggedInNav extends Component {
  render() {
    console.log(Items);
    return (
      <div>
        <MobileNav/>
        <div className="p-desktop_nav">
          <nav className="p-nav p-nav--logged_in">
            <Link to="/dashboard" className="p-nav__logo">
              fb
            </Link>
            <div className="p-nav__items">
              { Items.map(item => {
                return (
                  <Link to={item.link} className="p-nav__item">
                    <div className="p-nav__item_sub">{item.label}</div>
                  </Link>
                )
              })}
            </div>
            <Link to="/settings" className="p-nav__user">
              Cole Johnson
            </Link>
          </nav>
        </div>
      </div>
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
