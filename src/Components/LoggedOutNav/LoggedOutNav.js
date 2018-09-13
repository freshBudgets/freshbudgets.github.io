import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LoggedOutNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      home: true
    }
  }
  render() {
    return (
      <nav>
        Nav
      </nav>
    );
  }
}

export default LoggedOutNav;
