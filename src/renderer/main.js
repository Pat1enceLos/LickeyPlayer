import Vue from 'vue';
import fs from 'fs';
import { mapGetters } from 'vuex';
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
  computed: {
    ...mapGetters(['playlistQueueToShow', 'musicLibraryToShow']),
  },
  mounted() {
    window.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    window.addEventListener('dragleave', (e) => {
      e.preventDefault();
    });
    window.addEventListener('drop', (e) => {
      e.preventDefault();
      const files = Array.prototype.map.call(e.dataTransfer.files, f => f.path);
      const onlyFolders = files.every(file => fs.statSync(file).isDirectory());
      files.forEach(file => this.$electron.remote.app.addRecentDocument(file));
      if (onlyFolders) {
        if (this.playlistQueueToShow) {
          this.openFolders(...files);
        } else {
          this.importFolders(...files);
        }
      } else if (this.playlistQueueToShow) {
        this.openFiles(...files);
      } else {
        this.importFiles(...files);
      }
    });
  },
}).$mount('#app');
