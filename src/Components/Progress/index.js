import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './_common.progress.source.scss';

const propTypes = {
  total: PropTypes.number,
  spent: PropTypes.number
}

const defaultProps = {
  total: 0,
  spent: 0
}

class Progress extends PureComponent {
  render() {
    const {spent, total} = this.props;
    const width = (spent / total)*100;
    const left = total - spent;

    return(
      <div className="c-progress">
        <div className="c-progress__so_far" style={{width: `${width}%`}}/>
        <div className="c-progress__left_wrapper">
          <div className="c-progress__left">
            <h1>${left}</h1>
            <h2>Left today</h2>
          </div>
        </div>
      </div>
    )
  }
}

Progress.propTypes = propTypes;
Progress.defaultProps = defaultProps;
export default (Progress)
