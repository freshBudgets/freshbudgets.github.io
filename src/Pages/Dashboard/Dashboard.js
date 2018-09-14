import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { _noop } from 'lodash';

import { logoutUser } from '../../Actions';

const propTypes = {
  isAuthenticated: PropTypes.bool,
  logoutUser: PropTypes.func,
}

const defaultProps = {
  logoutUser: _noop,
}

class Dashboard extends PureComponent {
  render() {
    const { isAuthenticated } = this.props;
    
    if(!isAuthenticated) return(<Redirect to="/login" />);

    return (
      <div>
        DASHBOARD {this.props.test}
        <button onClick={() => this.props.logoutUser()}>Logout</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { isAuthenticated } = state.user;

  return {
    isAuthenticated
  }
};

const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => dispatch(logoutUser())
});

Dashboard.propTypes = propTypes;
Dashboard.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
