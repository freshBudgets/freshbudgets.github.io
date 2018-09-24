import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

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
    amount: ''
  },
  isShowing: false
}

class EditTransaction extends PureComponent {
  render() {
    return (
      <Modal title="Edit Transaction" isShowing={this.props.isShowing} closeModal={this.props.hideEditModal} className="">
        <input type="text" placeholder="Name" defaultValue={this.props.transaction.from}/>
        <input type="text" placeholder="Budget"/>
        <button>Save</button>
      </Modal>
    )
  }
}

EditTransaction.propTypes = propTypes;
EditTransaction.defaultProps = defaultProps;
export default (EditTransaction)
