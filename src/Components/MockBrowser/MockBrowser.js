import React, { Component } from 'react';

import './_common.mock_browser.source.scss';

class MockBrowser extends Component {
  render() {
    return (
      <div className="browser-mockup" style={{width: this.props.width}}>
        <img src={this.props.src} width={this.props.width} height="auto" alt="browser window"/>
      </div>
    );
  }
}

export default MockBrowser;
