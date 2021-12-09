import * as router from './router';
import eventNames from './event';
import * as auth from './auth';

// load env variables
require('dotenv').config();

// expose boostrap API
window.boostrap = {
  router,
  eventNames,
  auth
}

// load page
auth.validateToken()
  .then(() => router.navigateTo(window.location.pathname));

// handle Back and Forward browser buttons
window.onpopstate = (e) => {
  router.navigateTo(window.location.pathname);
}
