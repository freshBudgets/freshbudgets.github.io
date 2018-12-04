import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { _noop } from 'lodash';
import NumberFormat from 'react-number-format';

import { apiPost } from '../../Functions/api'
import Modal from '../../Components/Modal';
import './_pillar.budget.transaction_table.source.scss';

const propTypes = {
  isShowing: PropTypes.bool,
  hideEditModal: PropTypes.func,
}

const defaultProps = {
  isShowing: false,
  hideEditModal: _noop,
}

class NewTransactionModal extends PureComponent {
  constructor(props) {
    super(props);

    this.state ={
      transaction: {
        amount: null,
        date: new Date(),
        name: '',
        budget_id: this.props.budgetId,
      },
      limit: 0,
      formattedLimit: 0
    }

    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeAmount = this.handleChangeAmount.bind(this);
    this.save = this.save.bind(this);
  }

  save() {
    apiPost('/transactions/add', this.state.transaction).then(res => {
      this.props.hideEditModal(true);

    })
  }

  handleChangeAmount(e) {
    this.setState({ transaction: { ...this.state.transaction, amount: e.target.value } });
  }

  handleChangeName(e) {
    this.setState({ transaction: { ...this.state.transaction, name: e.target.value } });
  }

  handleChangeDate(e) {
    this.setState({ transaction: { ...this.state.transaction, date: e.target.value } });
  }

  render() {
    return (
      <Modal title="Add Transaction" isShowing={this.props.isShowing} closeModal={this.props.hideEditModal} className="">
        <input type="text" ref="name" placeholder="Name" onChange={this.handleChangeName}/>
        <NumberFormat
          value={this.state.transaction.amount}
          decimalScale={2}
          thousandSeparator={true}
          prefix={'$'}
          placeholder="Amount"
          onValueChange={(values) => {
            const { value} = values;
            this.setState({transaction: {...this.state.transaction, amount: parseFloat(value)}})
        }}/>
        <input type="text" ref="date" placeholder="Date" onChange={this.handleChangeDate} defaultValue={this.state.transaction.date}/>
        <button onClick={this.save} style={{marginTop: '16px'}}>Save</button>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => ({
});

NewTransactionModal.propTypes = propTypes;
NewTransactionModal.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(NewTransactionModal)
