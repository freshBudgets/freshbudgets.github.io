import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import EditTransaction from './EditTransaction';
import './_pillar.budget.transaction_table.source.scss';

const propTypes = {
  transactions: PropTypes.array,
}

const defaultProps = {
  transactions: [],
}

class TransactionTable extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showEditModal: false,
      editingTransaction: {}
    }

    this.showEditModal = this.showEditModal.bind(this);
    this.hideEditModal = this.hideEditModal.bind(this);
  }
  showEditModal(transaction) {
    this.setState({
      showEditModal: true,
      editingTransaction: transaction
    })
  }
  hideEditModal() {
    this.setState({
      showEditModal: false,
      editingTransaction: {}
    })
  }

  renderNoTransactions() {
    return(
      <div>
        <p>
          We don't have any transactions stored for this budget categroy.
        </p>
        <p>
          Good job budgeting <span role="img" aria-label="Nice!">👍</span>
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
    if (transactions.length === 0) return this.renderNoTransactions();

    return(
      <div>
        <table className="p-transaction_table" cellSpacing='0'>
          <thead>
            <tr>
              <th className="p-transaction_table__column--location">Location</th>
              <th className="p-transaction_table__column--amount">Amount</th>
              <th className="p-transaction_table__column--edit">Edit</th>
            </tr>
          </thead>
          <tbody className="p-transaction_table__body">
            {
              transactions.map(transaction => {
                return this.renderTransactionRow(transaction);
              })
            }
          </tbody>
        </table>
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
