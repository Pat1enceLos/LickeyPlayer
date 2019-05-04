import Vue from 'vue';
import '@/css/style.scss';
import Login from '@/components/Login/Login.vue';
import store from '@/store';

Vue.prototype.$bus = new Vue(); // Global event bus
new Vue({
  store,
  components: { Login },
  data: {},
  template: '<Login/>',
}).$mount('#app');
