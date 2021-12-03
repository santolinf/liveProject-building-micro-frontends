import router from './router';

router.navigateTo(window.location.pathname);

// expose boostrap API
window.boostrap = {
  router
}
