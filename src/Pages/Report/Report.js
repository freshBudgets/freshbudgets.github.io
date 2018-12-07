import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { _noop } from 'lodash';
import { apiGet } from '../../Functions/api'
import { FormatPrice } from '../../Functions/Price'

import { loginUser } from '../../Actions';
import SideBarView from '../../Components/SideBarView';
import './_pillar.report.source.scss';

class Login extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      budgets: [],
    }

  }

  componentDidMount() {
    apiGet('/budget/monthlyReport').then((res) => {
      if (res.success) {
        this.setState({budgets: res.budgets});
      }
    })
  }

  renderReport(budget) {
    const average = budget.sum / 4;
    const limit = budget.budgetLimit;
    const name = budget.budgetName;

    return (
      <Link to={`/budget/${budget._id}`} key={budget._id}>
        <div className="c-card p-report__budget">
          <div className="p-report__budget_name">{name}</div>
          <div>You usually spend {FormatPrice(average)} when you've allocaded {FormatPrice(limit)}</div>
        </div>
      </Link>
    )
  }

  renderEmpty() {
    return (
      <div className="c-card p-report__empty">
        <p>
          We haven't generated a report for you yet.
        </p>
        <p className="c-tip">
          Don't put you money in the mattress. <span role="img" aria-label="Nice!">👍</span>
        </p>
      </div>
    )
  }

  render() {
    return (
      <div className="p-report">
        <div className="p-report__header">Report</div>
        {}
        { this.state.budgets.length > 0 ? this.state.budgets.map((budget) => {
          return this.renderReport(budget);
        }) : this.renderEmpty()}
      </div>
    )
  }
}

export default Login;
