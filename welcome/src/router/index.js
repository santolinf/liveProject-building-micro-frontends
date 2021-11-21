import Vue from 'vue';
import VueRouter from 'vue-router';
import Landing from '@/view/Landing';
import SignIn from '@/view/SignIn';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes: [
    {
      path: '/',
      component: Landing
    },
    {
      path: '/signin',
      component: SignIn
    }
  ]
});

export default router;
