import { apiPost } from '../Functions/api';
import { createUser, destroyUser } from '../Functions/UserManagement';

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds,
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user: user
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export function loginUser(creds) {
  return dispatch => {
    dispatch(requestLogin(creds))

    return new Promise((resolve, reject) => {
      apiPost('/login', creds).then( response => {
        if (!response.success) {
          dispatch(loginError("Invalid phone or password"));
          return reject(response.message);
        }
        createUser(response.token);
        dispatch(receiveLogin(response.user))

        resolve(response.user);
      }).catch(err => console.log(err));
    })
  }
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    destroyUser();
    dispatch(receiveLogout())
  }
}

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

function requestSignup(creds) {
  return {
    type: SIGNUP_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveSignup(user) {
  return {
    type: SIGNUP_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user
  }
}

function signupError(errorMap) {
  return {
    type: SIGNUP_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    errorMap
  }
}

export function signupUser(creds) {
  return dispatch => {
    dispatch(requestSignup(creds))

    return new Promise((resolve, reject) => {
      apiPost('/signup', creds).then( response => {
        if (!response.success) {
          dispatch(signupError(response.errorMap));
          reject(response.errorMap);
        }
        createUser(response.token);
        dispatch(receiveSignup(response.user));
      }).catch(err => console.log(err));
    });
  }
}

export const VERIFY_CODE_REQUEST = "VERIFY_CODE_REQUEST";
export const VERIFY_CODE_SUCCESS = "VERIFY_CODE_SUCCESS";
export const VERIFY_CODE_FAILURE = "VERIFY_CODE_FAILURE";

function requestCodeVerify() {
  return {
    type: VERIFY_CODE_REQUEST,
    isFetching: true,
    isAuthenticated: false,
  }
}

function receiveCodeVerify(user) {
  return {
    type: VERIFY_CODE_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    isVerified: true
  }
}

function codeVerifyError(errorMap) {
  return {
    type: VERIFY_CODE_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    errorMap
  }
}

export function verifyCode(code) {
  return dispatch => {
    dispatch(requestCodeVerify())

    return apiPost('/sms/verify', { verificationCode: code }).then( response => {
      if (!response.success) {
        dispatch(codeVerifyError(response.errorMap));
        return Promise.reject(response.errorMap);
      }

      dispatch(receiveCodeVerify());
    }).catch(err => console.log(err));
  }
}
