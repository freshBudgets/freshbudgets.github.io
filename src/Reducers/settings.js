import {
  SETTINGS_REQUEST,
  SETTINGS_SUCCESS,
  SETTINGS_UPDATE,
  SETTINGS_FAILURE,
} from '../Actions/Settings'

const INITIAL_STATE = {
  isFetching: false,
  email: false,
  sms: false
}

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SETTINGS_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case SETTINGS_UPDATE:
      return {
        ...state,
        isFetching: false,
        email: action.email,
        sms: action.sms,
      }
    case SETTINGS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        email: action.email,
        sms: action.sms
      }
    case SETTINGS_FAILURE:
      return {
        ...state,
        isFetching: false
      }
    default:
      return state
  }
}

export default user;
