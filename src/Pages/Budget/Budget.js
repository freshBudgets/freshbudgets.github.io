import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import Nav from '../../Components/Nav';
import Progress from '../../Components/Progress';
import TransactionTable from './TransactionTable';
import { getOneBudget } from '../../Actions/Budget';

import './_pillar.budget.source.scss';

const propTypes = {
  budget: PropTypes.object,
}

const defaultProps = {
  budget: {
    name: '',
    id: 0,
    total: 0,
    spent: 0,
    transactions: []
  }
}

class Budget extends PureComponent {
  componentWillMount() {
    const id = this.props.match.params.id;

    this.props.getOneBudget(id);
  }

  render() {
    const { budget } = this.props;
    return (
      <div className="p-budget">
        <Nav />
        <div className="p-budget__content">
          <Progress spent={budget.spent} total={budget.total} />
          <div className="p-budget__transactions c-card">
            <div className="c-card_header">Transactions</div>
            <TransactionTable transactions={budget.transactions} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { budget } = state.budget;

  return {
    budget
  }
};

const mapDispatchToProps = (dispatch) => ({
    getOneBudget: (id) => dispatch(getOneBudget(id)),
});

Budget.propTypes = propTypes;
Budget.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(Budget)
