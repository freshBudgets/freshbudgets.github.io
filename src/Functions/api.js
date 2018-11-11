import { getToken, destroyUser } from './UserManagement';
const API_URL = process.env.API_URL || 'https://api.freshbudgets.com/api';
// const API_URL = 'http://localhost:5000/api';

function getHeaders(token) {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Token': token
  };
}

export function apiGet(endpoint, token = getToken()) {
  return fetch(`${API_URL}${endpoint}/`, {headers: getHeaders(token)}).then((res) => {
    if (res.status === 401) {
      destroyUser();
      window.location = '/login';
    } else {
      return res.json()
    }
  });
}

export function apiPost(endpoint, data = {}, token = getToken()) {
  const options = {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(data)
  }

  return fetch(`${API_URL}${endpoint}/`, options).then((res) => {
    if (res.status === 401) {
      destroyUser();
      window.location = '/login';
    } else {
      return res.json()
    }
  });
}
