import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { apiGet, apiPost } from '../../Functions/api';
import Modal from '../../Components/Modal';
import MobileNav from '../../Components/Nav/MobileNav';
import './_pillar.recurring.source.scss';

const propTypes = {
};

const defaultProps = {
};

class Recurring extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      recurrings: [],
      newModalShowing: false,
      editModalShowing: false,
      recurring: {
        name: '',
        dayOfMonthDue: '',
      },
      editing: {}
    }

    this.showNewModal = this.showNewModal.bind(this);
    this.hideNewModal = this.hideNewModal.bind(this);
    this.showEditModal = this.showEditModal.bind(this);
    this.hideEditModal = this.hideEditModal.bind(this);
    this.save = this.save.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.getBills = this.getBills.bind(this);
  }

  getBills() {
    apiGet('/bills/all').then(res => {
      console.log(res);
      this.setState({recurrings: res.bills});
    })
  }

  componentDidMount() {
    this.getBills();
  }

  showNewModal() {
    this.setState({newModalShowing: true});
  }

  hideNewModal() {
    this.setState({newModalShowing: false});
  }
  showEditModal(recurring) {
    this.setState({editModalShowing: true, editing: recurring});
  }

  hideEditModal() {
    this.setState({editModalShowing: false});
    this.setState({editing: {}})
  }

  save() {
    apiPost('/bills/add', this.state.recurring).then((res) => {
      if (res.success) {
        this.getBills()
        this.hideModal();
        this.setState({recurring: {name: '', dayOfMonthDue: ''}})
      }
    })
  }

  update() {
    const recurring = this.state.editing;
    apiPost(`/bills/update/${recurring._id}`, recurring).then((res) => {
      if (res.success) {
        this.getBills()
        this.hideEditModal();
      }
    })
  }

  delete() {
    const recurring = this.state.editing;
    apiPost(`/bills/remove/${recurring._id}`, recurring).then((res) => {
      if (res.success) {
        this.getBills()
        this.hideEditModal();
      }
    })
  }

  renderNoRecurring() {
    return (
      <div className="c-card p-recurring__empty">
        <p>
          You don't have any recurring transactions. Some examples are Spotify,
          Netflix, or Google Plus. Click the plus in the corner to add one!
        </p>
        <p className="c-tip">
          Early to bed and early to rise makes a person healthy, wealthy, and wise. <span role="img" aria-label="Nice!">👍</span>
        </p>
      </div>
    )
  }

  renderRecurring(recurring) {
    return (
      <div className="c-card p-recurring__item" key={recurring._id} onClick={() => this.showEditModal(recurring)}>
        <div>{recurring.name}</div>
        <div>{recurring.dayOfMonthDue}</div>
      </div>
    )
  }

  render() {
    const { recurrings, newModalShowing, editModalShowing } = this.state;
    return (
      <div className="p-recurring">
        <div className="p-recurring__header">
          <div><MobileNav />Recurring Transactions</div>
          <i className="fa fa-plus p-budget__settings_icon" onClick={this.showNewModal}></i>
        </div>
        <p className="c-tip">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        { recurrings.length === 0 ? this.renderNoRecurring() :
          <div>
            { recurrings.map(recurring => {
              return this.renderRecurring(recurring);
            })}
          </div>
        }

        {/* New */}
        <Modal isShowing={newModalShowing} closeModal={this.hideNewModal} title="New Recurring Transaction">
          <input
            type="text"
            placeholder="Name"
            value={this.state.recurring.name}
            onChange={(e) => {this.setState({recurring: {...this.state.recurring, name: e.target.value}})}}
            ref="recurring_name" />
          <input
            type="text"
            placeholder="Day of Month"
            value={this.state.recurring.dayOfMonthDue}
            onChange={(e) => {this.setState({recurring: {...this.state.recurring, dayOfMonthDue: e.target.value}})}}
            ref="recurring_name" />
          <button onClick={this.save}>Save</button>
        </Modal>

        {/* Edit */}
        <Modal isShowing={editModalShowing} closeModal={this.hideEditModal} title="Edit Recurring Transaction">
          <input
            type="text"
            placeholder="Name"
            value={this.state.editing.name}
            onChange={(e) => {this.setState({editing: {...this.state.editing, name: e.target.value}})}}
            ref="editing_name" />
          <input
            type="text"
            placeholder="Day of Month"
            value={this.state.editing.dayOfMonthDue}
            onChange={(e) => {this.setState({editing: {...this.state.editing, dayOfMonthDue: e.target.value}})}}
            ref="editing_name" />
          <div className="p-recurring__edit_actions">
            <button onClick={this.update}>Save</button>
            <div onClick={this.delete} className="c-error_text p-budget__delete">Delete Recurring</div>
          </div>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
});

Recurring.propTypes = propTypes;
Recurring.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(Recurring);
