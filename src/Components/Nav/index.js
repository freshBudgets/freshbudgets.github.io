import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import LoggedOutNav from './LoggedOutNav';
import LoggedInNav from './LoggedInNav';

const propTypes = {
  isAuthenticated: PropTypes.bool,
}

const defaultProps = {
  isAuthenticated: false,
}

class Nav extends PureComponent {
  render() {
    const { isAuthenticated } = this.props;

    return isAuthenticated ? <LoggedInNav /> : <LoggedOutNav />
  }
}

const mapStateToProps = (state) => {
  const { isAuthenticated } = state.user;

  return {
    isAuthenticated
  }
};

Nav.propTypes = propTypes;
Nav.defaultProps = defaultProps;
export default connect(mapStateToProps)(Nav)
