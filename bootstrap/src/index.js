import router from './router';
import eventNames from './event';
import auth from './auth';

// load env variables
require('dotenv').config();

// expose boostrap API
window.boostrap = {
  router,
  eventNames,
  auth
}

function validateToken() {
  const token = auth.getToken();
  if (!token) {
    return Promise.resolve(false);
  }

  return fetch(process.env.TOKEN_VALIDATE_URL, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }
  })
  .then(response => response.ok)
  .catch(() => false);
}

// load page
validateToken()
  .then(authenticated => {
    router.init(authenticated);
    router.navigateTo(window.location.pathname);
  });
