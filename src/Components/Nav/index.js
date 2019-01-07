import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import LoggedOutNav from './LoggedOutNav';
import LoggedInNav from './LoggedInNav';

const propTypes = {
  isAuthenticated: PropTypes.bool,
}

const defaultProps = {
  isAuthenticated: false,
}

class Nav extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      shouldRedirect: false
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isAuthenticated !== this.props.isAuthenticated) {
      this.setState({shouldRedirect:true});
    }
  }

  render() {
    const { isAuthenticated } = this.props;
    if (this.state.shouldRedirect) return <Redirect to="/login" />
    // return isAuthenticated ? <div className="p-desktop_nav"><LoggedInNav /></div> : <LoggedOutNav />
    return <LoggedInNav />;
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
