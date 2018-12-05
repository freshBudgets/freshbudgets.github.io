import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { _noop } from 'lodash';

import { getSettings, saveSettings } from '../../Actions/Settings';
import MobileNav from '../../Components/Nav/MobileNav';
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
      message: null,
    }

    this.handleSave = this.handleSave.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeSms = this.handleChangeSms.bind(this);
  }

  componentDidMount() {
    this.props.getSettings();
  }

  handleChangeEmail(e) {
    const email = e.target.checked;
    this.props.saveSettings(email,this.props.settings.sms)
  }

  handleChangeSms(e) {
    const sms = e.target.checked;
    this.props.saveSettings(this.props.settings.email, sms)
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
        <div className="p-settings__header"><MobileNav />Settings</div>
        <div className="c-card p-settings__card">
          <div className="c-card_header">Notification Settings</div>
          <div className="p-settings__setting">
            <input type="checkbox" checked={settings.email} onChange={this.handleChangeEmail} ref="email_setting"/> I would like to get emails.
          </div>
          <div className="p-settings__setting">
            <input type="checkbox" checked={settings.sms} onChange={this.handleChangeSms} ref="sms_setting"/> I would like to get sms notifications.
          </div>
          <div className="p-settings__setting">
            { settings.isFetching ? 'Saving...' : ''}
          </div>
          { this.state.message && this.state.message}
        </div>
        <div className="c-card p-settings__link_account">
          <div className="c-card_header">Actions</div>
          <div className="p-settings__actions">
            <button onClick={this.props.logoutUser} className="">Logout</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { settings } = state;
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
