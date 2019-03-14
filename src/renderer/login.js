import Vue from 'vue';
import '@/css/style.scss';
import Login from '@/components/Login/Login.vue';

new Vue({
  components: { Login },
  data: {},
  template: '<Login/>',
}).$mount('#app');
