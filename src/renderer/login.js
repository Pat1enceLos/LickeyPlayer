import Vue from 'vue';
import '@/css/style.scss';
import Login from '@/components/Login/Login.vue';

Vue.prototype.$bus = new Vue(); // Global event bus
new Vue({
  components: { Login },
  data: {},
  template: '<Login/>',
}).$mount('#app');
