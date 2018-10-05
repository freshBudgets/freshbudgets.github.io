import { isAuthenticated } from '../Functions/UserManagement';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  VERIFY_CODE_REQUEST,
  VERIFY_CODE_SUCCESS,
  VERIFY_CODE_FAILURE,
} from '../Actions';

import {
  SETTINGS_REQUEST,
  SETTINGS_SUCCESS,
  SETTINGS_UPDATE,
} from '../Actions/Settings'

import {
  TRUIFY_AUTH,
  FALSIFY_AUTH,
} from '../Actions/Token';

const INITIAL_STATE = {
  isFetching: false,
  isAuthenticated: isAuthenticated(),
  user: {
    firstName: '',
    lastName: '',
    isVerified: false,
  },
  errorMap: {},
  settings: {
    email: false,
    sms: false
  }
}

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isFetching: false,
        user: {
          firstName: action.user.firstName,
          lastName: action.user.lastName,
          isVerified: action.user.isVerified
        }
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMap: {login: action.message},
      }
    case LOGOUT_SUCCESS:
      return INITIAL_STATE
    case SIGNUP_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        user: {
          firstName: action.user.firstName,
          lastName: action.user.lastName,
          isVerified: action.user.isVerified
        },
        errorMap: {}
      }
    case SIGNUP_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMap: action.errorMap
      }
    case VERIFY_CODE_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false
      }
    case VERIFY_CODE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        user: {
          ...state.user,
          isVerified: true,
        }
      }
    case VERIFY_CODE_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMap: action.errorMap,
      }
    case TRUIFY_AUTH:
      return {
        ...state,
        isAuthenticated: true,
      }
    case FALSIFY_AUTH:
      return {
        ...state,
        isAuthenticated: false,
      }
    case SETTINGS_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case SETTINGS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        settings: action.settings
      }
    case SETTINGS_UPDATE:
      return {
        ...state,
        isFetching: false,
        settings: {
          email: action.email,
          sms: action.sms
        }
      }
    default:
      return state
  }
}

export default user;
