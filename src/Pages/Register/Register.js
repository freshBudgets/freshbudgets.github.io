import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { _noop } from 'lodash';
import { Link } from 'react-router-dom';
import { signupUser } from '../../Actions';
import { Redirect } from 'react-router-dom';

import SideBarView from '../../Components/SideBarView';
import './_pillar.login.source.scss';

const propTypes = {
  signupUser: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  errorMap: PropTypes.object,
  isFetching: PropTypes.bool,
};

const defaultProps = {
  signupUser: _noop,
  isAuthenticated: false,
  errorMap: {},
  isFetching: false,
};

class Register extends PureComponent {
  handleClick(event) {
    const creds = {
      firstName: this.refs.firstName.value.trim(),
      lastName: this.refs.lastName.value.trim(),
      phoneNumber: this.refs.phoneNumber.value.trim(),
      email: this.refs.email.value.trim(),
      password: this.refs.password.value.trim()
    }

    this.props.signupUser(creds);
  }

  render() {
    const { errorMessage, isAuthenticated, isFetching } = this.props
    if (isAuthenticated) return(<Redirect to="/dashboard"/>);

    return (
      <SideBarView isFetching={isFetching}>
        <h1>FreshBudgets</h1>
        <input type='text' ref='firstName' className="form-control" placeholder='First Name'/>
        <input type='text' ref='lastName' className="form-control" placeholder='Last Name'/>
        <input type='text' ref='email' className="form-control" placeholder='Email'/>
        <input type='text' ref='phoneNumber' className="form-control" placeholder='Phone Number'/>
        <input type='password' ref='password' className="form-control" placeholder='Password'/>
        <button onClick={(event) => this.handleClick(event)}>
          Register
        </button>

        {errorMessage &&
          <p>{errorMessage}</p>
        }
        <div className="p-login__extra_links">
          <Link to="/login" className="p-login__links">Already have an account? Login</Link>
        </div>
      </SideBarView>
    )
  }
}

const mapStateToProps = (state) => {
  const { isAuthenticated, errorMap, isFetching } = state.user;

  return {
    isAuthenticated,
    errorMap,
    isFetching,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  signupUser: (creds) => dispatch(signupUser(creds))
});

Register.propTypes = propTypes;
Register.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(Register);
