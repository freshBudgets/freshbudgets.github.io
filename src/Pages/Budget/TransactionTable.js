import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './_pillar.budget.transaction_table.source.scss';

const propTypes = {
  transactions: PropTypes.array
}

const defaultProps = {
  transactions: []
}

class TransactionTable extends PureComponent {

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
      </tr>
    );
  }

  render() {
    const {transactions} = this.props;

    if (transactions.length === 0) return this.renderNoTransactions();

    return(
      <table className="p-transaction_table" cellspacing='0'>
        <thead>
          <tr>
            <th className="p-transaction_table__column--location">Location</th>
            <th className="p-transaction_table__column--amount">Amount</th>
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
    )
  }
}

TransactionTable.propTypes = propTypes;
TransactionTable.defaultProps = defaultProps;
export default (TransactionTable)
