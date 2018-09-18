import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PieChart from "react-svg-piechart"

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
    let left = budget.total - budget.spent;
    let data = [];
    let subText = '';
    if (left < 0) {
      data = [{title: "Over", value: budget.spent, color: "#FF585B"}];
      subText = 'Over Budget'
    } else {
      data = [
        {title: "Left", value: left, color: "#E5E5E5"},
        {title: "Spent", value: budget.spent, color: "#00848B"},
      ];
      subText = 'Left Today'
    }

    left = parseFloat(Math.round(Math.abs(left) * 100) / 100).toFixed(2);

    return(
      <Link to={`/budget/${budget.id}`} className="c-dashboard_budget">
        <div className="c-dashboard_budget__chart_wrapper">
          <PieChart data={data} />
          <div className="c-dashboard_budget__chart_nums">
            <div>
              <h1>${left}</h1>
              <h2>{subText}</h2>
            </div>
          </div>
        </div>
        <h2>{budget.name}</h2>
      </Link>
    )
  }
}

DashboardBudget.propTypes = propTypes;
DashboardBudget.defaultProps = defaultProps;
export default (DashboardBudget)
