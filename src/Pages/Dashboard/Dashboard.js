import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { _noop } from 'lodash';

import { logoutUser } from '../../Actions';
import Nav from '../../Components/Nav';
import Hero from '../../Public/Images/hero.svg';
import './_pillar.dashboard.source.scss';

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
      <div className="p-dashboard">
        <Nav />
        <div>
          <img src={Hero} width="300px" height="auto" alt="Hero"/>
          <h1>Functionality Coming Soon™</h1>
        </div>
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
