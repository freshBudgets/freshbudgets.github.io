import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { _noop } from 'lodash';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { format, normalize } from 'react-phone-input-auto-format';

import { loginUser } from '../../Actions';
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
  constructor(props) {
    super(props);

    this.state = {
      formattedPhoneNumber: '',
      isVerified: false,
    }

    this.changePhoneNumber = this.changePhoneNumber.bind(this);
  }

  handleClick(event) {
    const creds = {
      phoneNumber: normalize(this.refs.phone.value.trim()),
      password: this.refs.password.value.trim()
    }

    this.props.loginUser(creds).then((res) => {
      this.setState({isVerified: res.isVerified})
      console.log('poop', res);
    });
  }

  changePhoneNumber(e) {
    this.setState({
      formattedPhoneNumber: format(e.target.value)
    })
  }

  render() {
    const { errorMessage, isAuthenticated, isFetching, user} = this.props;
    if (isAuthenticated && !user.isVerified) return  <Redirect to="/verify_phone"/>;
    if (isAuthenticated && user.isVerified ) return <Redirect to="/dashboard"/>;

    return (
      <SideBarView isFetching={isFetching}>
        <h1>FreshBudgets</h1>
        <input onChange={this.changePhoneNumber} value={this.state.formattedPhoneNumber} type='text' ref='phone' className="form-control" placeholder='Phone Number'/>
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
  const { isAuthenticated, errorMessage, isFetching, user } = state.user;

  return {
    isAuthenticated,
    errorMessage,
    isFetching,
    user,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  loginUser: (creds) => dispatch(loginUser(creds))
});

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(Login);
