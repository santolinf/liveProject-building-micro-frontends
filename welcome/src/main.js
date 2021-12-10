import Vue from 'vue';
import router from './router';
import { BootstrapVue } from 'bootstrap-vue';
import { getEventNames } from './bootstrap';
import App from './App.vue';

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)

Vue.config.productionTip = false

const vueInstance = new Vue({
  router,
  render: h => h(App),
});

// clean Vue instance after micro frontend is unmounted
function cleanVM() {
  // clean up its connections with other existing vms, unbind all its directives, turn off all event listeners
  vueInstance.$destroy();

  // remove this listener
  window.document.removeEventListener(getEventNames().MICRO_FRONTEND_DID_UNMOUNT, cleanVM);
}

window.document.addEventListener(getEventNames().MICRO_FRONTEND_DID_UNMOUNT, cleanVM);

vueInstance.$mount('#app')
