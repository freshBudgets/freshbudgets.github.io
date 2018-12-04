import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
// import ReactTable from "react-table";
import "react-table/react-table.css";
import { _noop } from 'lodash';

import { FormatPrice } from '../../Functions/Price';
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

    this.setState({
      editingTransaction: transaction[0],
      showEditModal: true,
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
      <div className="c-card">
        <p>
          We don't have any transactions stored for this budget categroy.
        </p>
        <p>
          Remember, a penny saved is a penny earned <span role="img" aria-label="Nice!">👍</span>
        </p>
      </div>
    );
  }

  render() {
    const {transactions} = this.props;
    if (transactions.length === 0) return this.renderNoTransactions();

    return(
      <div>
        {
          transactions.map((transaction) => {
            return (
              <div
                className="c-card p-budget__transaction"
                key={transaction._id}
                onClick={() => this.showEditModal(transaction._id)}
                >
                  <div>
                    <div className="c-text_body">
                      {transaction.name}
                    </div>
                    <div className="c-text_small p-budget__transaction_date">
                      {moment(transaction.date).format('MMM DD, YYYY')}
                    </div>
                  </div>
                  <div>
                    {FormatPrice(transaction.amount)}
                  </div>
              </div>
            )
          })
        }

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
