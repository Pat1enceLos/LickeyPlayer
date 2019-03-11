import Vue from 'vue';

import helpers from '@/helpers';
import App from './App';
import router from './router';
import store from './store';

Vue.prototype.$bus = new Vue(); // Global event bus
if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;

Vue.mixin(helpers);

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
