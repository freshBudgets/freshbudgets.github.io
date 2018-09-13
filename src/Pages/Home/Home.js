import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LoggedOutNav from '../../Components/LoggedOutNav';

import './_pillar.home.source.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      home: true
    }
  }
  render() {
    return (
      <div className="p-home">
        <div className="p-home__content">
          <h1>Fresh Budgets</h1>
          <h2>Keep your financials in check and start spending right.</h2>
          <Link to="/login"><button>login</button></Link>
        </div>
      </div>
    );
  }
}

export default Home;
