import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import { find, isEmpty } from 'lodash';

import { apiPost } from '../../Functions/api'
import Modal from '../../Components/Modal';
import './_pillar.budget.transaction_table.source.scss';

const propTypes = {
  transaction: PropTypes.object,
  isShowing: PropTypes.bool,
  hideEditModal: PropTypes.func,
  budgets : PropTypes.array
}

const defaultProps = {
  transaction: null,
  isShowing: false,
  budgets: {}
}

class EditTransaction extends PureComponent {
  constructor(props) {
    super(props);

    this.state ={
      name: '',
      selectedOption: {},
    }

    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.handleChangeBudget = this.handleChangeBudget.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!isEmpty(this.props.transaction) && this.props.transaction !== prevProps.transaction) {
      const budId = this.props.transaction.budget_id;
      const budget = find(this.props.budgets, {id: budId});
      this.setState({selectedOption: {value: budget.id, label: budget.name}})
    }
  }

  save() {
    const updatedTransaction = {
      transaction_id: this.props.transaction._id,
      currentBudget: this.props.transaction.budget_id,
      newBudget: this.state.selectedOption.value,
      name: this.state.name || this.props.transaction.name,
      amount: this.props.transaction.amount,
      date: new Date(),
    }

    apiPost('/transactions/update', updatedTransaction).then(res => {
      this.props.hideEditModal(true);
    })
  }

  delete() {
    const options = {
      transaction_id: this.props.transaction._id,
    }
    apiPost('/transactions/remove', options).then(res => {
      this.props.hideEditModal(true);
    })
  }

  handleChangeBudget(selectedOption) {
    this.setState({ selectedOption });
  }

  render() {
    const options = this.props.budgets.map(b => {return {value: b.id, label: b.name}});
    const { selectedOption } = this.state;

    return (
      <Modal title="Edit Transaction" isShowing={this.props.isShowing} closeModal={this.props.hideEditModal} className="">
        <input type="text" ref="name" placeholder="Name" onChange={e => this.setState({name: e.target.value})} defaultValue={this.props.transaction.name}/>
        <Select
          value={selectedOption}
          onChange={this.handleChangeBudget}
          options={options}
        />
        <div className="p-edit_transactions__actions">
          <button onClick={this.save} style={{marginTop: '16px'}}>Save</button>
          <div onClick={this.delete} className="c-error_text">Delete Transaction</div>
        </div> 
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  const { budgets } = state.budget;

  return { budgets }
};

const mapDispatchToProps = (dispatch) => ({
});

EditTransaction.propTypes = propTypes;
EditTransaction.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(EditTransaction)
