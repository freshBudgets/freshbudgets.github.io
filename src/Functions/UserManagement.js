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

/* tricky little ricky function
  0 - !authed
  1 - Authed, !verified
  2 - authed, verified
*/
const isAuthenticated = () => {
  return 2;
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

    let int = 0;
    const isVerified = state.user.user.isVerified;

    if (ret && !isVerified) int = 1;
    else if (ret && isVerified) int = 2;

    return int;
  }
}

export {createUser, destroyUser, getToken, isAuthenticated};
