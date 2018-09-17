import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { _noop } from 'lodash';

import { logoutUser } from '../../Actions';
import { getAllBudgets } from '../../Actions/Budget';
import Nav from '../../Components/Nav';
import Progress from '../../Components/Progress';
import DashboardBudget from '../../Components/DashboardBudget';
import './_pillar.dashboard.source.scss';

const propTypes = {
  isAuthenticated: PropTypes.bool,
  logoutUser: PropTypes.func,
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
  logoutUser: _noop,
  getAllBudgets: _noop,
}

class Dashboard extends PureComponent {
  componentWillMount() {
    this.props.getAllBudgets();
  }
  render() {
    const { isAuthenticated, total, budgets } = this.props;
    if(!isAuthenticated) return(<Redirect to="/login" />);

    return (
      <div className="p-dashboard">
        <Nav />
        <Progress total={total.total} spent={total.spent} />
        <div className="p-dashboard__budgets_wrapper">
          <h1 className="p-dashboard__h1">Budgets</h1>
          <div className="p-dashboard__budgets">
            {
              Object.keys(budgets).map(id => {
                return <DashboardBudget budget={budgets[id]} key={id} />
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { isAuthenticated, user } = state.user;
  const { total, budgets } = state.budget;

  return {
    isAuthenticated,
    user,
    total,
    budgets
  }
};

const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => dispatch(logoutUser()),
    getAllBudgets: () => dispatch(getAllBudgets()),
});

Dashboard.propTypes = propTypes;
Dashboard.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
