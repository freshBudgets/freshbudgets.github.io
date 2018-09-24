export const TRUIFY_AUTH = 'TRUIFY_AUTH';
export const FALSIFY_AUTH = 'FALSIFY_AUTH';

function truifyAuth() {
  return {
    type: TRUIFY_AUTH,
    isAuthenticated: true,
  }
}

function falsifyAuth() {
  return {
    type: FALSIFY_AUTH,
    isAuthenticated: false,
  }
}

export function updateAuth(authState) {
  return dispatch => {
    if (authState) {
      dispatch(truifyAuth());
    } else {
      dispatch(falsifyAuth());
    }
  }
}
