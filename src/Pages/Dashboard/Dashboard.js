import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { _noop } from 'lodash';
import { Link } from 'react-router-dom';

import { getAllBudgets } from '../../Actions/Budget';
import Progress from '../../Components/Progress';
import DashboardBudget from '../../Components/DashboardBudget';
import BudgetSelector from '../../Components/BudgetSelector';
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

  renderNoBudgets() {
    return(
      <div className="p-dashboard__empty_state">
        <p>
          You haven't created a budget yet.
        </p>
        <p>
          Create one to get started <span role="img" aria-label="Nice!">👍</span>
        </p>
        <Link to="/create_budget">
          <button>Get Started</button>
        </Link>
      </div>
    );
  }

  render() {
    const { total, budgets } = this.props;

    return (
      <div className="p-dashboard">
          <div className="p-dashboard__content">
            { budgets.length === 0 ? this.renderNoBudgets() : <div>
              <div className="p-dashboard__title">Budget Overview</div>
              <Progress total={total.total} spent={total.spent} />
              <div className="p-dashboard__budgets_wrapper c-card">
                <div className="c-card_header">
                  <div className="p-dashboard__transaction_header">
                    <span>Your Budgets</span>
                    <span>
                      <Link to='/create_budget'><i className="fa fa-plus"></i></Link>
                    </span>
                  </div>
                </div>
                  { this.renderBudgets() }
              </div>
            </div>
            }
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
