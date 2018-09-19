import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PlaidLink from 'react-plaid-link'

import Nav from '../../Components/Nav';
import './_pillar.add_account.source.scss';

const propTypes = {
}

const defaultProps = {
}

class AddAccount extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false
    }

    this.onEvent = this.onEvent.bind(this);
  }
  handleOnSuccess(token, metadata) {
    console.log(token, metadata);
    // send token to client server
  }
  handleOnExit() {
    // handle the case when your user exits Link
  }
  onEvent(e) {
    if (e === 'OPEN') {
      this.setState({modalOpen: true});
    }
    if (e === 'EXIT' || e === 'HANDOFF') {
      this.setState({modalOpen: false});
    }
  }
  render() {
    const spacerClass = this.state.modalOpen ? 'p-add_account__spacer--open' : 'p-add_account__spacer';
    return (
      <div className="p-add_account">
        <Nav />
        <div className="p-add_account__content">
          <h1>Add an account to get started!</h1>
          <div className={spacerClass} />
          <PlaidLink
            clientName="Fresh Budgets"
            env="sandbox"
            product={["auth", "transactions"]}
            publicKey="c71dae3573f12ec78aaaabfeca273d"
            style={{}}
            onExit={this.handleOnExit}
            onEvent={this.onEvent}
            onSuccess={this.handleOnSuccess}>
            Connect
          </PlaidLink>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => ({
});

AddAccount.propTypes = propTypes;
AddAccount.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(AddAccount)
