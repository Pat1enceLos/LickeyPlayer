<template>
  <div id="app" class="application">
    <router-view></router-view>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapGetters } from 'vuex';
import '@/css/style.scss';
import drag from '@/helpers/drag';
import infoDB from './helpers/infoDB';

export default {
  name: 'lickeymusic',
  computed: {
    ...mapGetters(['isLogin', 'loginUser']),
  },
  watch: {
    isLogin(val) {
      if (val) {
        infoDB.get('AudioInfo', this.loginUser).then((data) => {
          let createdPlaylistQueue = [];
          if (data.createdPlaylist) {
            createdPlaylistQueue = _.flatten(data.createdPlaylist.map(i => i.src)) || [];
          }
          this.$store.dispatch('initialInfoDB', data);
          this.$store.dispatch('updateAudioInfo', _.uniq(_.concat(data.playlistQueue || [], data.musicLibraryPlaylist || [], createdPlaylistQueue)));
        });
      } else {
        this.$store.dispatch('removeInfoDB');
      }
    },
  },
  methods: {
    mainCommitProxy(commitType, commitPayload) {
      this.$store.dispatch(commitType, commitPayload);
    },
  },
  mounted() {
    this.$electron.ipcRenderer.on('mainCommit', (event, commitType, commitPayload) => {
      this.mainCommitProxy(commitType, commitPayload);
    });
    this.$electron.ipcRenderer.on('update-login-user', (event, id) => {
      this.$store.dispatch('updateLoginUser', id);
    });
    drag(this.$el);
  },
};
</script>

<style>
  /* CSS */
</style>
