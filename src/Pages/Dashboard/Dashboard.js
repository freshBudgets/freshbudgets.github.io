import React, { Component,  } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { _noop } from 'lodash';

import { logoutUser } from '../../Actions';

const propTypes = {
  logoutUser: PropTypes.func,
}

const defaultProps = {
  logoutUser: _noop,
}

class Dashboard extends Component {
  render() {
    return (
      <div>
        DASHBOARD {this.props.test}
        <button onClick={() => this.props.logoutUser()}>Logout</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const test = true;

  return {
    test
  }
};

const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => dispatch(logoutUser())
});

Dashboard.propTypes = propTypes;
Dashboard.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
