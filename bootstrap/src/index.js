import router from './router';
import eventNames from './event';

router.navigateTo(window.location.pathname);

// expose boostrap API
window.boostrap = {
  router,
  eventNames
}
