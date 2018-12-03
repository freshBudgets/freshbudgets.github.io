import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './_common.small_progress.source.scss';

const propTypes = {
  total: PropTypes.number,
  spent: PropTypes.number
}

const defaultProps = {
  total: 0,
  spent: 0
}

class SmallProgress extends PureComponent {
  render() {
    const {spent, total} = this.props;
    let width = (spent / total)*100;
    width = width >= 100 ? 100 : width;

    // let left = total - spent;
    // left = parseFloat(Math.round(left * 100) / 100).toFixed(2);
    let type = '';
    if (spent && total) {
      type = spent > total ? 'red' : 'green';      
    }

    return(
      <div className="c-small_progress">
        <div className={`c-small_progress__sub_bar c-small_progress__sub_bar-${type}`} />
        <div
          className={`c-small_progress__top_bar c-small_progress__top_bar-${type}`}
          style={{width: `${width}%`}}
        />
      </div>
    )
  }
}

SmallProgress.propTypes = propTypes;
SmallProgress.defaultProps = defaultProps;
export default (SmallProgress)
