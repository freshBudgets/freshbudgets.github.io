import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PlaidLink from './PlaidLink';

import { linkAccount } from '../../Actions/Account';
import './_pillar.add_account.source.scss';

const propTypes = {
}

const defaultProps = {
}

class AddAccount extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      redirect: false,
      message: null,
    }

    this.onEvent = this.onEvent.bind(this);
    this.handleOnSuccess = this.handleOnSuccess.bind(this);
    this.handleOnExit = this.handleOnExit.bind(this);
  }

  componentDidMount() {
    const env = this.props.location.search.substring(5);
    this.setState({env: env === 'dev' ? 'development' : 'sandbox'});
  }

  handleOnSuccess(token, metadata) {
    const obj = {
      publicToken: token,
      accountIDs: metadata.accounts.map((account) => account.id),
    }

    this.props.linkAccount(obj).then(() => {
      this.setState({redirect: true});
    }).catch((message) => {
      this.setState({message});
    })
  }

  handleOnExit() {
    this.setState({message: 'You clicked the little x. Redirecting...'});
    this.setState({redirect: true});
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
    if (this.state.redirect) return <Redirect to="/dashboard" />
    return (
      <div className="p-add_account">
        <div className="p-add_account__content">
          { this.state.message && this.state.message }
          <PlaidLink
            clientName="Fresh Budgets"
            env={this.state.env}
            product={["auth", "transactions"]}
            publicKey="c71dae3573f12ec78aaaabfeca273d"
            style={{}}
            onExit={this.handleOnExit}
            onEvent={this.onEvent}
            webhook="https://api.freshbudgets.com/api/plaid/transaction"
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
  linkAccount: (obj) => dispatch(linkAccount(obj))
});

AddAccount.propTypes = propTypes;
AddAccount.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(AddAccount)
