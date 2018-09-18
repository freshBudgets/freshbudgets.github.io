import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { _noop } from 'lodash';
import { format, normalize } from 'react-phone-input-auto-format';

import { verifyCode } from '../../Actions';
import SideBarView from '../../Components/SideBarView';
import './_pillar.verify_phone.source.scss';

const propTypes = {
  loginUser: PropTypes.func,
  isFetching: PropTypes.bool,
  errorMessage: PropTypes.string,
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool
};

const defaultProps = {
  loginUser: _noop,
  isAuthenticated: false,
  user: {
    isVerified: false
  }
};

class VerifyPhone extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      formattedCode: ''
    }

    this.changeCode = this.changeCode.bind(this);
  }

  handleClick(event) {
    const code = normalize(this.refs.code.value.trim());

    this.props.verifyCode(code);
  }

  changeCode(e) {
    this.setState({
      formattedCode: format(e.target.value)
    })
  }

  render() {
    const { errorMessage, isFetching, user, isAuthenticated} = this.props;

    if (user.isVerified && isAuthenticated) return <Redirect to="/dashboard" />
    if (user.isVerified && !isAuthenticated) return <Redirect to="/login" />

    return (
      <SideBarView isFetching={isFetching}>
        <h1>Verify Your Number</h1>
        <p>You should recieve a text shortly with a code. Go ahead and enter that here.</p>
        <input
          onChange={this.changeCode}
          value={this.state.formattedCode}
          type='text'
          ref='code'
          className="p-verify_phone__code_input"
          placeholder='Code'
          maxLength="7"
        />
        <button onClick={(event) => this.handleClick(event)}>
          Verify
        </button>
        {errorMessage &&
          <p>{errorMessage}</p>
        }
        <div className="p-verify_phone__extra_links">
          <div className="p-login__links">
            Didn't get a text? Send it again
          </div>
        </div>
      </SideBarView>
    )
  }
}

const mapStateToProps = (state) => {
  const { errorMessage, isFetching, user, isAuthenticated } = state.user;

  return {
    errorMessage,
    isFetching,
    user,
    isAuthenticated
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  verifyCode: (creds) => dispatch(verifyCode(creds))
});

VerifyPhone.propTypes = propTypes;
VerifyPhone.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(VerifyPhone);
