import React, { Component } from 'react';
import InfiniteSpinner from '../InfiniteSpinner';

import './_pillar.side_bar_view.source.scss';

class SideBarView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      home: true
    }
  }
  render() {
    const { children, isFetching } = this.props;

    return (
      <div className="p-side_bar_view">
        <div className="p-side_bar_view__art"></div>
        <div className="p-side_bar_view__container">
          <div className="p-side_bar_view__container_content">
            { isFetching ? <InfiniteSpinner /> : children }
          </div>
        </div>

      </div>
    );
  }
}

export default SideBarView;
