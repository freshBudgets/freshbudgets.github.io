import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// import NumberFormat from 'react-number-format';
import { _noop } from 'lodash';

import { getSettings, saveSettings } from '../../Actions/Settings';
import { logoutUser } from '../../Actions/';
import './_pillar.settings.source.scss';

const propTypes = {
  logoutUser: PropTypes.func,
  getSettings: PropTypes.func,
  saveSettings: PropTypes.func,
  user: PropTypes.object,
}

const defaultProps = {
  logoutUser: _noop,
  getSettings: _noop,
  saveSettings: _noop,
  user: {
    settings: {
      email: false,
      sms: false,
    }
  }
}

class Settings extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      message: null
    }

    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    this.props.getSettings();
  }

  handleSave() {
    const email = this.refs.email_setting.checked
    const sms = this.refs.sms_setting.checked

    this.props.saveSettings(email,sms)
  }

  render() {
    const { settings } = this.props;
    return (
      <div className="p-settings">
        <div className="p-settings__header">Settings</div>
        <div className="c-card p-settings__card">
          <div className="p-settings__setting">
            <input type="checkbox" defaultChecked={settings.email} ref="email_setting"/> I would like to get emails.
          </div>
          <div className="p-settings__setting">
            <input type="checkbox" defaultChecked={settings.sms} ref="sms_setting"/> I would like to get sms notifications.
          </div>
          <div className="p-settings__setting">
            <button onClick={this.handleSave}>Save</button>
          </div>
          { this.state.message && this.state.message}
        </div>
        <div className="c-card">
          <button onClick={this.props.logoutUser} className="">Logout</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { settings } = state.user;

  return {
    settings
  };
};

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser()),
  getSettings: () => dispatch(getSettings()),
  saveSettings: (email, sms) => dispatch(saveSettings(email,sms))
});

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(Settings)
