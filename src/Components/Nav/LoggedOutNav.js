import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './_pillar.nav.source.scss';

class LoggedOutNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      home: true
    }
  }
  render() {
    return (
      <nav className="p-nav p-nav--logged_out">
        FreshBudgets
        <div className="p-nav__items">
          <Link to="/login"><div className="p-nav__item">
            Login
          </div></Link>
        </div>
      </nav>
    );
  }
}

export default LoggedOutNav;
