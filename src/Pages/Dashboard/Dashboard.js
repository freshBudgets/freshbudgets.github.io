import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { _noop } from 'lodash';
import { Link } from 'react-router-dom';

import { getAllBudgets } from '../../Actions/Budget';
import Nav from '../../Components/Nav';
import Progress from '../../Components/Progress';
import DashboardBudget from '../../Components/DashboardBudget';
import './_pillar.dashboard.source.scss';

const propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  total: PropTypes.object,
  budgets: PropTypes.object,
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
  budgets: {},
  getAllBudgets: _noop,
}

class Dashboard extends PureComponent {
  componentDidMount() {
    this.props.getAllBudgets();
  }

  render() {
    const { total, budgets } = this.props;

    return (
      <div className="p-dashboard">
        <Nav />
        <div className="p-dashboard__content">
          <Progress total={total.total} spent={total.spent} />
          <div className="p-dashboard__budgets_wrapper c-card">
            <div className="c-card_header">Your Budgets</div>
            <div className="p-dashboard__budgets">
              {
                Object.keys(budgets).map(id => {
                  return <DashboardBudget budget={budgets[id]} key={id} />
                })
              }
            </div>
          </div>
          <div className="p-dashboard__actions">
            <Link className="p-dashboard__action_button c-card c-clickable_card" to="/create_budget">
              <div className="c-light_text"><i className="fa fa-plus-circle fa-2x"></i></div>
              <div className="c-light_text">Create Budget Category</div>
            </Link>
            <Link className="p-dashboard__action_button c-card c-clickable_card" to="/add_account?env=dev">
              <div className="c-light_text"><i className="fa fa-plus-circle fa-2x"></i></div>
              <div className="c-light_text">Link Bank Account</div>
            </Link>
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
