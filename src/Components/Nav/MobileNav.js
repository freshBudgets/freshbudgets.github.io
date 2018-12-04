import React, { Component } from 'react';
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { _noop } from 'lodash';
import LoggedInNav from './LoggedInNav';

import './_pillar.mobile_nav.source.scss';

const propTypes = {
}

const defaultProps = {
}

class MobileNav extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isShowing: false,
    }

    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav() {
    this.setState({isShowing: !this.state.isShowing})
  }

  render() {
    const { isShowing } = this.state;
    return (
      <div className="p-mobile_nav">
        <div className="p-mobile_nav__button" onClick={this.toggleNav}><i className="fa fa-bars"></i></div>
        { isShowing ?
          <div className="p-mobile_nav__nav">
            <div className="p-movile_nav__bg" onClick={this.toggleNav}/>
            <LoggedInNav />
          </div> : null }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
});

MobileNav.propTypes = propTypes;
MobileNav.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(MobileNav)
