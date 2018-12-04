import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PlaidLink from './PlaidLink';
import MobileNav from '../../Components/Nav/MobileNav';

import { linkAccount } from '../../Actions/Account';
import { apiGet } from '../../Functions/api';
import './_pillar.accounts.source.scss';

const propTypes = {
}

const defaultProps = {
}

class Accounts extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      accounts: [],
    }

    this.handleOnSuccess = this.handleOnSuccess.bind(this);
  }

  componentDidMount() {
    const env = this.props.location.search.substring(5);
    this.setState({env: env === 'dev' ? 'development' : 'sandbox'});

    apiGet('/accounts').then(res => {
      if (res.success) {
        this.setState({accounts: res.accounts});
      }
    })
  }

  componentWillUnmount() {
    const plaid = document.getElementById('plaid-link-iframe-1');
    plaid.style.display = 'none';
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

  renderNoAccounts() {
    return (
      <div className="c-card">
        <p>
          You don't have any account added to Fresh Budgets yet. Click the plus
          in the corner to add one!
        </p>
        <p>
          Remember, money doesn't grow on trees, it grows by smartly spending. <span role="img" aria-label="Nice!">👍</span>
        </p>
      </div>
    )
  }

  renderAccount() {
    return (
      <div className="c-card">
        Account
      </div>
    )
  }

  render() {
    const { accounts } = this.state;
    return (
      <div className="p-add_account">
        <div className="p-add_account__header">
          <div className="p-add_account__name"><MobileNav />Accounts</div>
          <PlaidLink
            clientName="Fresh Budgets"
            env={this.state.env}
            product={["auth", "transactions"]}
            publicKey="c71dae3573f12ec78aaaabfeca273d"
            style={{}}
            webhook="https://api.freshbudgets.com/api/plaid/transaction"
            onSuccess={this.handleOnSuccess}>
            Connect
          </PlaidLink>
        </div>
        <div className="p-add_account__content">
          { accounts.length === 0 ? this.renderNoAccounts() :
            accounts.map((account) => {
              return this.renderAccount(account);
            })
          }

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

Accounts.propTypes = propTypes;
Accounts.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(Accounts)
