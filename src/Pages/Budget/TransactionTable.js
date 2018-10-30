import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { _noop } from 'lodash';

import EditTransaction from './EditTransaction';
import './_pillar.budget.transaction_table.source.scss';

const propTypes = {
  transactions: PropTypes.array,
  updateTransactions: PropTypes.func
}

const defaultProps = {
  transactions: [],
  updateTransactions: _noop,
}

class TransactionTable extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showEditModal: false,
      editingTransaction: {},
      transactions: this.props.transactions
    }

    this.showEditModal = this.showEditModal.bind(this);
    this.hideEditModal = this.hideEditModal.bind(this);
  }
  showEditModal(transactionId) {
    const transaction = this.props.transactions.filter(t => t._id === transactionId);
    console.log(transaction);
    this.setState({
      showEditModal: true,
      editingTransaction: transaction[0]
    })
  }
  hideEditModal(shouldUpdateTransactions = false) {
    this.setState({
      showEditModal: false,
      editingTransaction: {}
    })
    if (shouldUpdateTransactions) this.props.updateTransactions();
  }

  renderNoTransactions() {
    return(
      <div>
        <p>
          We don't have any transactions stored for this budget categroy.
        </p>
        <p>
          Remember, a penny saved is a penny earned <span role="img" aria-label="Nice!">👍</span>
        </p>
      </div>
    );
  }

  renderTransactionRow(transaction) {
    return (
      <tr key={`${transaction.from}-${transaction.price}`}>
        <td>
          {transaction.from}
        </td>
        <td className="p-transaction_table__column--amount">
          ${transaction.amount}
        </td>
        <td>
          <i className="fa fa-pencil p-transaction_table__edit_transaction_button" onClick={() => this.showEditModal(transaction)}></i>
        </td>
      </tr>
    );
  }

  render() {
    const {transactions} = this.props;

    const mappedTransactions = transactions.map(t => {
      return {name: t.name, amount: t.amount, edit: t._id};
    })

    if (transactions.length === 0) return this.renderNoTransactions();
    const columns = [
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        Cell: row => (<span>${row.value}</span>)
      },
      {
        Header: 'Edit',
        accessor: 'edit',
        Cell: row => (<i onClick={ () => {this.showEditModal(row.value)} } className="fa fa-pencil"></i>),
        maxWidth: 50
      }
    ]
    return(
      <div>
        <ReactTable
          data={mappedTransactions}
          columns={columns}
          className=""
          defaultPageSize={5}
        />
        <EditTransaction
          transaction={this.state.editingTransaction}
          isShowing={this.state.showEditModal}
          hideEditModal={this.hideEditModal}
        />
      </div>

    )
  }
}

TransactionTable.propTypes = propTypes;
TransactionTable.defaultProps = defaultProps;
export default (TransactionTable)
