import Cookies from 'js-cookie';

import {store} from '../store';
import { updateAuth } from '../Actions/Token';

const createUser = (token, callback) => {
  Cookies.set('token', token);
}

const destroyUser = () => {
  Cookies.remove('token');
}

const getToken = () => {
  return Cookies.get('token');
}

const isAuthenticated = () => {
  const token = Cookies.get('token');
  let tokenIsStored = false;
  let ret = false;
  if (store) {
    const state = store.getState();
    const isAuthenticated = state.user.isAuthenticated;
    if (token) tokenIsStored = token.length > 10;

    if (isAuthenticated && tokenIsStored) {
      ret = true;
    } else if (!isAuthenticated && tokenIsStored) {
      store.dispatch(updateAuth(true));
      ret = true;
    } else if (isAuthenticated && !tokenIsStored) {
      store.dispatch(updateAuth(false));
      ret = false
    }

    return ret;
  }
}

export {createUser, destroyUser, getToken, isAuthenticated};
