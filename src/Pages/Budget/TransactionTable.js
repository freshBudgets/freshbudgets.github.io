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
      transactions: this.props.transactions,
      search: '',
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
          We don't have any transactions stored for this budget category.
        </p>
        <p>
          Remember, a penny saved is a penny earned <span role="img" aria-label="Nice!">👍</span>
        </p>
      </div>
    );
  }

  render() {
    const {transactions} = this.props;
    const {search} = this.state;
    if (transactions.length === 0) return this.renderNoTransactions();

    const filteredTransactions = transactions.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()));
    return(
      <div>
        <div className="p-transaction_table__header">
          <div className="p-transaction_table__header_text">Transactions This Week</div>
          <input onChange={(e) => {this.setState({search: e.target.value})}} className="p-transaction_table__search" placeholder="Search" />
        </div>
        {
          filteredTransactions.map((transaction) => {
            return (
              <div
                className="c-card p-budget__transaction c-clickable_card"
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
