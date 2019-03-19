import Vue from 'vue';
import fs from 'fs';
import VueElectron from 'vue-electron';
import helpers from '@/helpers';
import App from './App';
import router from './router';
import store from './store';

Vue.prototype.$bus = new Vue(); // Global event bus
if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;

Vue.use(VueElectron);

Vue.mixin(helpers);

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
  mounted() {
    window.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    window.addEventListener('dragleave', (e) => {
      e.preventDefault();
    });
    window.addEventListener('drop', (e) => {
      console.log(123);
      e.preventDefault();
      const files = Array.prototype.map.call(e.dataTransfer.files, f => f.path);
      console.log(files);
      const onlyFolders = files.every(file => fs.statSync(file).isDirectory());
      files.forEach(file => this.$electron.remote.app.addRecentDocument(file));
      this.openFiles(...files);
      // if (onlyFolders) {
      //   this.openFolder(...files);
      // } else {
      //   this.openFile(...files);
      // }
    });
  },
}).$mount('#app');
