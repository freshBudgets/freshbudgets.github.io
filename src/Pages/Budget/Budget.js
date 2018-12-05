import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { Line } from 'react-chartjs-2';

import { apiGet, apiPost } from '../../Functions/api'
import MobileNav from '../../Components/Nav/MobileNav';
import SmallProgress from '../../Components/SmallProgress';
import Modal from '../../Components/Modal';
import TransactionTable from './TransactionTable';
import NewTransactionModal from './NewTransactionModal'
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
      budget: {
        _id: '',
        budgetLimit: 0,
        budgetName: "",
        currentAmount: 0,
      },
      deleted: false,
      editBudgetModal: false,
      limit: this.props.budget.total,
      formattedLimit: this.props.budget.total,
      transactions: [],
      newTransactionModal: false,
    }

    this.onDelete = this.onDelete.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.showNewTransactionModal = this.showNewTransactionModal.bind(this);
    this.hideNewTransactionModal = this.hideNewTransactionModal.bind(this);
    this.updateBudget = this.updateBudget.bind(this);
    this.updateTransactions = this.updateTransactions.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    apiGet(`/budget/${id}`).then( response => {
      if (!response.success) {
        const message = response.message || 'Problem getting budget';
        console.error(message);
      }

      this.setState({budget: {...response.budgets}});
    })

    this.updateTransactions();
  }

  updateTransactions() {
    apiGet(`/transactions/budget/${this.props.match.params.id}`).then( response => {
      this.setState({transactions: response.transactions});
    })
  }

  onDelete() {
    apiPost('/budget/delete', {budgetID: this.state.budget._id}).then(response => {
      if (!response.success) {
        const message = response.message || 'Problem getting budget';
        console.error(message);
      }
      this.setState({deleted: true})
    });
  }

  showModal() {
    this.setState({editBudgetModal: true});
  }

  hideModal() {
    this.setState({editBudgetModal: false});
  }

  showNewTransactionModal() {
    this.setState({newTransactionModal: true});
  }

  hideNewTransactionModal() {
    this.setState({newTransactionModal: false});
  }

  updateBudget() {
    const budget = {
      newBudgetName: this.state.budget.budgetName,
      newBudgetLimit: this.state.budget.budgetLimit,
      budgetID: this.state.budget._id
    }

    apiPost('/budget/edit', budget).then(response => {
      if (!response.success) {
        const message = response.message || 'Problem getting budget';
        console.error(message);
      }

      this.setState({
        budget: {
          ...this.state.budget,
          budgetName: budget.newBudgetName,
          budgetLimit: budget.newBudgetLimit
        },
        editBudgetModal: false
      });
    })
  }

  render() {
    const { budget, transactions } = this.state;
    if (this.state.deleted) return <Redirect to="/dashboard" />;
    const headerType = budget.currentAmount > budget.budgetLimit ? 'red' : 'green';
    const left = parseFloat(Math.round((budget.budgetLimit - budget.currentAmount) * 100) / 100).toFixed(2);
    const id = this.props.match.params.id;
    const chartData = transactions.map((t, i) => {
      return t.amount
    })

    const data = {
      labels: chartData,
      datasets: [
        {
          label: 'Transactions',
          fill: false,
          lineTension: 0,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(105,203,228,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: chartData
        }
      ]
    };

    console.log(chartData);

    return (
      <div className="p-budget">
        <div className={`p-budget__header p-budget__header-${headerType}`}>
          <div className="p-budget__title_bar">
            <div className="p-budget__title"><MobileNav/>{budget.budgetName}</div>
            <i className="fa fa-cog p-budget__settings_icon" onClick={this.showModal}></i>
          </div>
          <div className="p-budget__left">${left}</div>
          <div className="p-budget__progress_wrapper">
            <SmallProgress spent={budget.currentAmount} total={budget.budgetLimit} />
          </div>
          <div className="p-budget__left_unit">Left in your budget this week</div>
        </div>
        <div className="p-budget__transactions">
          <div className="p-budget__transactions_header">
            <div>Transactions</div>
            <i className="fa fa-plus fa-sm" onClick={this.showNewTransactionModal}></i>
          </div>
          <div className="p-budget__graph">
            <Line
              data={data}
            />
          </div>
          <TransactionTable transactions={transactions} updateTransactions={this.updateTransactions}/>
        </div>

        <Modal title="Edit Budget" isShowing={this.state.editBudgetModal} closeModal={this.hideModal}>
          <input
            type="text"
            placeholder="Name"
            defaultValue={this.state.budget.budgetName}
            onChange={(e) => {this.setState({budget: {...this.state.budget, budgetName: e.target.value}})}}
            ref="budget_name" />
          <NumberFormat
            value={this.state.budget.budgetLimit}
            decimalScale={2}
            thousandSeparator={true}
            prefix={'$'}
            onValueChange={(values) => {
              const {formattedValue, value} = values;
              this.setState({budget: {...this.state.budget, budgetLimit: parseFloat(value)}, limit: value, formattedLimit: formattedValue})
          }}/>
          <div className="p-budget__edit_modal_actions">
            <button onClick={this.updateBudget}>Save</button>
            <div className="c-error_text p-budget__delete" onClick={this.onDelete}>Delete Budget</div>
          </div>
        </Modal>

        <NewTransactionModal isShowing={this.state.newTransactionModal} hideEditModal={this.hideNewTransactionModal} budgetId={id}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => ({
});

Budget.propTypes = propTypes;
Budget.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(Budget)
