import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { _noop } from 'lodash';
import { Link } from 'react-router-dom';
import { loginUser } from '../../Actions';

import SideBarView from '../../Components/SideBarView';
import './_pillar.login.source.scss';

const propTypes = {
  loginUser: PropTypes.func,
};

const defaultProps = {
  loginUser: _noop,
};

class Login extends PureComponent {
  handleClick(event) {
    const creds = {
      email: this.refs.username.value.trim(),
      password: this.refs.password.value.trim()
    }

    this.props.loginUser(creds);
  }

  render() {
    const { errorMessage } = this.props

    return (
      <SideBarView>
        <h1>FreshBudgets</h1>
        <input type='text' ref='username' className="form-control" placeholder='Username'/>
        <input type='password' ref='password' className="form-control" placeholder='Password'/>
        <button onClick={(event) => this.handleClick(event)}>
          Login
        </button>

        {errorMessage &&
          <p>{errorMessage}</p>
        }
        <div className="p-login__extra_links">
          <Link to="/register" className="p-login__links">Register</Link>{' '}/{' '}
          <Link to="/reset" className="p-login__links">
            Forgot your password?
          </Link>
        </div>
      </SideBarView>
    )
  }
}

const mapStateToProps = (state) => {
  const { isAuthenticated, errorMessage } = state.user;

  return {
    isAuthenticated,
    errorMessage
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  loginUser: (creds) => dispatch(loginUser(creds))
});

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(Login);
