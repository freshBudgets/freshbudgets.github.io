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
} from '../Actions'

function user(state = {
    isFetching: false,
    isAuthenticated: isAuthenticated(),
    user: {
      firstName: '',
      lastName: '',
      isVerified: false
    },
    errorMessage: '',
  }, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
        user: {
          firstName: action.user.firstName,
          lastName: action.user.lastName,
          isVerified: action.user.isVerified
        }
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false
      })
    case SIGNUP_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
    case SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        user: {
          firstName: action.user.firstName,
          lastName: action.user.lastName,
          isVerified: action.user.isVerified
        },
        errorMap: {}
      })
    case SIGNUP_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMap: action.errorMap
      })
    case VERIFY_CODE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
    case VERIFY_CODE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        user: {
          ...state.user,
          isVerified: true
        }
      })
    case VERIFY_CODE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMap: action.errorMap
      })
    default:
      return state
  }
}

export default user;
