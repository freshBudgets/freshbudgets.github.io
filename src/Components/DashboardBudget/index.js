import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import InfiniteSpinner from '../InfiniteSpinner';

import './_common.dashboard_budget.source.scss';

const propTypes = {
  budget: PropTypes.object,
}

const defaultProps = {
  budget: {
    id: 0,
    name: '',
    total: 0,
    spent: 0
  },
}

class DashboardBudget extends PureComponent {
  render() {
    const {budget} = this.props;
    // const width = budget.spent / budget.total;
    // const left = budget.total - budget.spent;

    return(
      <div className="c-dashboard_budget">
        <InfiniteSpinner />
        {budget.name}
      </div>
    )
  }
}

DashboardBudget.propTypes = propTypes;
DashboardBudget.defaultProps = defaultProps;
export default (DashboardBudget)
