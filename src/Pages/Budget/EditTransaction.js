import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { apiPost } from '../../Functions/api'
import Modal from '../../Components/Modal';
import './_pillar.budget.transaction_table.source.scss';

const propTypes = {
  transaction: PropTypes.object,
  isShowing: PropTypes.bool,
  hideEditModal: PropTypes.func
}

const defaultProps = {
  transaction: {
    name: '',
    amount: '',
    _id: ''
  },
  isShowing: false
}

class EditTransaction extends PureComponent {
  constructor(props) {
    super(props);

    this.state ={
      name: ''
    }

    this.save = this.save.bind(this);
  }
  save() {
    console.log(this.props.transaction);
    const updatedTransaction = {
      transaction_id: this.props.transaction._id,
      budget_id: '5bb7744218cf2800164a16d1',
      name: this.state.name,
      amount: this.props.transaction.amount,
      date: new Date(),
    }
    console.log(updatedTransaction);
    apiPost('/transactions/update', updatedTransaction).then(res => {
      console.log(res);
      this.props.hideEditModal(true);
    })
  }

  render() {
    return (
      <Modal title="Edit Transaction" isShowing={this.props.isShowing} closeModal={this.props.hideEditModal} className="">
        <input type="text" ref="name" placeholder="Name" onChange={e => this.setState({name: e.target.value})} defaultValue={this.props.transaction.name}/>
        <input type="text" ref="budget" placeholder="Budget"/>
        <button onClick={this.save}>Save</button>
      </Modal>
    )
  }
}

EditTransaction.propTypes = propTypes;
EditTransaction.defaultProps = defaultProps;
export default (EditTransaction)
