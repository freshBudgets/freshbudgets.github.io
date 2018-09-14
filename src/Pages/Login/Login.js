import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { _noop } from 'lodash';
import { Link } from 'react-router-dom';
import { loginUser } from '../../Actions';
import { Redirect } from 'react-router-dom';

import SideBarView from '../../Components/SideBarView';
import './_pillar.login.source.scss';

const propTypes = {
  loginUser: PropTypes.func,
  isFetching: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  errorMessage: PropTypes.string,
};

const defaultProps = {
  loginUser: _noop,
};

class Login extends PureComponent {
  handleClick(event) {
    const creds = {
      phoneNumber: this.refs.phone.value.trim(),
      password: this.refs.password.value.trim()
    }

    this.props.loginUser(creds);
  }

  render() {
    const { errorMessage, isAuthenticated, isFetching } = this.props
    if (isAuthenticated) return(<Redirect to="/dashboard"/>);

    return (
      <SideBarView>
        <h1>FreshBudgets</h1>
        <input type='text' ref='phone' className="form-control" placeholder='Phone Number'/>
        <input type='password' ref='password' className="form-control" placeholder='Password'/>
        <button onClick={(event) => this.handleClick(event)}>
          Login
        </button>
        <div>
          { isFetching ? 'Loading...' : null}          
        </div>

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
  const { isAuthenticated, errorMessage, isFetching } = state.user;

  return {
    isAuthenticated,
    errorMessage,
    isFetching,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  loginUser: (creds) => dispatch(loginUser(creds))
});

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(Login);
