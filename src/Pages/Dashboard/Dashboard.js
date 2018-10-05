import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { _noop } from 'lodash';

import { getAllBudgets } from '../../Actions/Budget';
import Progress from '../../Components/Progress';
import DashboardBudget from '../../Components/DashboardBudget';
import './_pillar.dashboard.source.scss';

const propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  total: PropTypes.object,
  budgets: PropTypes.array,
  getAllBudgets: PropTypes.func
}

const defaultProps = {
  user: {
    firstName: '',
    lastName: ''
  },
  total: {
    spent: 0,
    total: 0
  },
  budgets: [],
  getAllBudgets: _noop,
}

class Dashboard extends PureComponent {
  componentDidMount() {
    this.props.getAllBudgets();
  }

  renderBudgets() {
    const { budgets } = this.props;

    return (
      <div className="p-dashboard__budgets">
        {
          Object.keys(budgets).map(id => {
            return <DashboardBudget budget={budgets[id]} key={id} />
          })
        }
      </div>
    )
  }

  render() {
    const { total, budgets } = this.props;

    return (
      <div className="p-dashboard">
        <div className="p-dashboard__content">
          <div className="p-dashboard__title">Budget Overview</div>
          <Progress total={total.total} spent={total.spent} />
          <div className="p-dashboard__budgets_wrapper c-card">
            <div className="c-card_header">Your Budgets</div>
            { budgets.length === 0 ?
              <div>
                No budgets
              </div>
              :
              this.renderBudgets()
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { user } = state.user;
  const { total, budgets } = state.budget;

  return {
    user,
    total,
    budgets
  }
};

const mapDispatchToProps = (dispatch) => ({
    getAllBudgets: () => dispatch(getAllBudgets()),
});

Dashboard.propTypes = propTypes;
Dashboard.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
