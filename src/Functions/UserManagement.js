const createUser = (token, callback) => {
  localStorage.setItem('token', token);
}

const destroyUser = () => {
  localStorage.removeItem('token');
}

const getToken = () => {
  return localStorage.getItem('token');
}

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  let ret = false;

  if (token !== null) ret = token.length > 10;

  return ret
}

export {createUser, destroyUser, getToken, isAuthenticated};
