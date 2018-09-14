import React, { Component } from 'react';
import './_pillar.side_bar_view.source.scss';

class SideBarView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      home: true
    }
  }
  render() {
    const { children } = this.props;

    return (
      <div className="p-side_bar_view">
        <div className="p-side_bar_view__art"></div>
        <div className="p-side_bar_view__container">
          <div>
            { children }
          </div>
        </div>

      </div>
    );
  }
}

export default SideBarView;
