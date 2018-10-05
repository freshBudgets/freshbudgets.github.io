import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NumberFormat from 'react-number-format';

import Progress from '../../Components/Progress';
import Modal from '../../Components/Modal';
import TransactionTable from './TransactionTable';
import { getOneBudget, deleteBudget, updateBudget } from '../../Actions/Budget';

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
  constructor(props) {
    super(props);

    this.state = {
      deleted: false,
      editBudgetModal: false,
      newName: this.props.budget.name,
      newTotal: this.props.budget.total,
      limit: this.props.budget.total,
      formattedLimit: this.props.budget.total,
    }

    this.onDelete = this.onDelete.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.updateBudget = this.updateBudget.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    this.props.getOneBudget(id);
  }

  onDelete() {
    this.props.deleteBudget(this.props.budget.id).then((message) => {
      this.setState({deleted: true})
    })
  }

  showModal() {
    this.setState({editBudgetModal: true});
  }

  hideModal() {
    this.setState({editBudgetModal: false});
  }

  updateBudget() {
    const budget = {
      newBudgetName: this.state.newName,
      newBudgetLimit: this.state.limit,
      budgetID: this.props.budget.id
    }

    this.props.updateBudget(budget).then(() => {
      this.setState({editBudgetModal: false});
    });
  }

  render() {
    const { budget } = this.props;

    if (this.state.deleted) return <Redirect to="/dashboard" />;

    return (
      <div className="p-budget">
        <div className="p-budget__content">
          <div className="p-budget__title_bar">
            <div className="p-budget__title">{budget.name}</div>
            <i className="fa fa-cog p-budget__settings_icon" onClick={this.showModal}></i>
          </div>
          <Progress spent={budget.spent} total={budget.total} />
          <div className="p-budget__transactions c-card">
            <div className="c-card_header">Transactions</div>
            <TransactionTable transactions={budget.transactions} />
          </div>
        </div>
        <Modal title="Edit Budget" isShowing={this.state.editBudgetModal} closeModal={this.hideModal}>
          <input
            type="text"
            placeholder="Name"
            defaultValue={this.props.budget.name}
            onChange={(e) => {this.setState({newName: e.target.value})}}
            ref="budget_name" />
          <NumberFormat
            value={this.state.formattedLimit}
            decimalScale={2}
            thousandSeparator={true}
            prefix={'$'}
            onValueChange={(values) => {
              const {formattedValue, value} = values;
              this.setState({limit: value, formattedLimit: formattedValue})
          }}/>
          <div className="p-budget__edit_modal_actions">
            <button onClick={this.updateBudget}>Save</button>
            <div className="c-error_text p-budget__delete" onClick={this.onDelete}>Delete Budget</div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { budget } = state.budget;

  return {
    budget,
  }
};

const mapDispatchToProps = (dispatch) => ({
    getOneBudget: (id) => dispatch(getOneBudget(id)),
    deleteBudget: (id) => dispatch(deleteBudget(id)),
    updateBudget: (budget) => dispatch(updateBudget(budget)),
});

Budget.propTypes = propTypes;
Budget.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(Budget)
