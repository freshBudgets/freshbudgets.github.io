const createUser = (token, callback) => {
  sessionStorage.setItem('token', token);
}

const destroyUser = () => {
  sessionStorage.removeItem('token');
}

const getToken = () => {
  return sessionStorage.getItem('token');
}

const isAuthenticated = () => {
  const token = sessionStorage.getItem('token');
  let ret = false;

  if (token !== null) ret = token.length > 10;

  return ret
}

export {createUser, destroyUser, getToken, isAuthenticated};
