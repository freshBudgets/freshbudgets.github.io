import { apiGet, apiPost } from '../Functions/api';

export const SETTINGS_REQUEST = "SETTINGS_REQUEST";
export const SETTINGS_SUCCESS = "SETTINGS_SUCCESS";
export const SETTINGS_UPDATE = "SETTINGS_UPDATE";
export const SETTINGS_FAILURE = "SETTINGS_FAILURE";

function requestSettings() {
  return {
    type: SETTINGS_REQUEST,
    isFetching: true
  }
}

function updateSettings(email,sms) {
  return {
    type: SETTINGS_UPDATE,
    isFetching: false,
    email,
    sms
  }
}

function receiveSettings(settings) {
  console.log(settings);
  return {
    type: SETTINGS_SUCCESS,
    isFetching: false,
    settings,
  }
}

function settingsFailure(message) {
  return {
    type: SETTINGS_FAILURE,
    isFetching: false,
    message
  }
}

export function getSettings() {
  return dispatch => {
    dispatch(requestSettings());

    return apiGet('/settings').then( response => {
      if (!response.success) {
        const message = response.message || 'Problem getting settings';
        dispatch(settingsFailure(message));
        return Promise.reject(message);
      }

      const settings = {
        email: response.emailNotifications,
        sms: response.smsNotifications
      }

      dispatch(receiveSettings(settings));

      return Promise.resolve('Settings Updated')
    })
  }
}

export function saveSettings(email, sms) {
  return dispatch => {
    dispatch(requestSettings());

    const settings = {
      emailNotifications: email,
      smsNotifications: sms
    }

    return apiPost('/settings/update', settings).then(response => {
      if (!response.success) {
        const message = response.message || 'Problem getting settings';
        dispatch(settingsFailure(message));
        return Promise.reject(message);
      }

      dispatch(updateSettings(email, sms));
    })
  }
}
