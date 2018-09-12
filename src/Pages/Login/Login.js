import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { apiPost } from '../../Functions/api';
import { createUser } from '../../Functions/UserManagement';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      apiError: ''
    }
  }

  updateEmail = (e) => {
    this.setState({
      email: e.target.value
    })
  }
  updatePassword = (e) => {
    this.setState({
      password: e.target.value
    })
  }
  login = () => {
    const credentials = {
      email: this.state.email,
      password: this.state.password
    }

    apiPost('auth/login', credentials).then((data) => {
      if (data.success) {
        createUser(data.token)
        window.location.reload()
        this.context.router.history.push('/dashboard');
      } else {
        this.setState({ apiError: data.message })
      }
    });
  }

  render() {
    const { apiError } = this.state;
    return (
      <div>
        {/* <Nav /> */}
        <div className="flex flex-center login-wrapper">
          <div className="center">
            <h1 className="text-center">Login</h1>
            <div className="" style={{width: '400px'}}>
              <h3>Email</h3>
              <input type="email" name="email" className="margin-y" onChange={this.updateEmail} />
              <h3>Password</h3>
              <input type="password" name="password" className="margin-y" onChange={this.updatePassword} />
              <div>
                <button onClick={this.login}>Login</button><br/>
                <Link to='/register'><div className="margin-y link">Register</div></Link>
                <Link to='/forgot'><div className="margin-y link2">Forgot your password?</div></Link>
              </div>
              <div style={{marginTop: '12px'}}>{ apiError }</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  static contextTypes = {
    router: PropTypes.object
  }
}



export default Login;
