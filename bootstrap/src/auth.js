
const TOKEN_KEY = 'boostrap_auth_token';

let isUserAuthenticated = false;

function setToken(token) {
  if (!token) {
    window.localStorage.removeItem(TOKEN_KEY);
    return;
  }

  window.localStorage.setItem(TOKEN_KEY, token);
  isUserAuthenticated = true;
}

function getToken() {
  return window.localStorage.getItem(TOKEN_KEY);
}

function validateToken() {
  const token = getToken();
  if (!token) {
    return Promise.resolve(false);
  }

  return fetch(process.env.TOKEN_VALIDATE_URL, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }
  })
    .then(response => isUserAuthenticated = response.ok)
    .catch(() => isUserAuthenticated = false);
}

export {
  setToken,
  getToken,
  validateToken,
  isUserAuthenticated
}
