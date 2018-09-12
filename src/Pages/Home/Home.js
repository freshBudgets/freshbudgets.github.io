import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      home: true
    }
  }
  render() {
    return (
      <div>Fresh Budgets</div>
    );
  }
}

export default Home;
