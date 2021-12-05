import Vue from 'vue';
import VueRouter from 'vue-router';
import Landing from '@/view/Landing';
import SignIn from '@/view/SignIn';
import NotFound from '@/view/NotFound';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes: [
    {
      name: 'SignIn',
      path: '/signin',
      component: SignIn
    },
    {
      name: 'Home',
      path: '/',
      component: Landing
    },
    {
      path: '*',
      component: NotFound
    }
  ]
});

export default router;
