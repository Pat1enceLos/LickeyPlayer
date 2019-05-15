<template>
  <div id="app" class="application">
    <router-view></router-view>
    <Notification></Notification>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapGetters } from 'vuex';
import nicknames from 'nicknames';
import '@/css/style.scss';
import drag from '@/helpers/drag';
import infoDB from './helpers/infoDB';
import Notification from './components/Notification.vue';

export default {
  name: 'lickeymusic',
  components: {
    Notification,
  },
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
          if (data.audioInfo) {
            data.audioInfo.forEach((item) => {
              this.$store.dispatch('updateAudioInfoDirectly', item);
            });
          } else {
            this.$store.dispatch('updateAudioInfo', _.uniq(_.concat(data.playlistQueue || [], data.musicLibraryPlaylist || [], createdPlaylistQueue)));
          }
        });
        infoDB.get('User', this.loginUser).then(async (data) => {
          if (data.img) {
            this.$store.dispatch('updateUserImg', data.img);
          }
          if (data.birth !== undefined &&
            data.gender !== undefined &&
            data.name !== undefined &&
            data.description !== undefined) {
            this.$store.dispatch('updateBirth', data.birth);
            this.$store.dispatch('updateGender', data.gender);
            this.$store.dispatch('updateName', data.name);
            this.$store.dispatch('updateDescription', data.description);
          } else {
            const initialBirth = new Date();
            const initialName = nicknames.allRandom();
            this.$store.dispatch('updateBirth', initialBirth);
            this.$store.dispatch('updateGender', '保密');
            this.$store.dispatch('updateName', initialName);
            this.$store.dispatch('updateDescription', '这个人很懒，什么都没有留下。。');
            this.storeQueueHandler({
              table: 'User',
              data: {
                gender: '保密', birth: initialBirth, description: '这个人很懒，什么都没有留下。。', name: initialName,
              },
            });
          }
        });
      } else {
        this.$store.dispatch('updateUserImg', '');
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
    this.$electron.ipcRenderer.on('add-notification', (event, info) => {
      this.$store.dispatch('addNotifications', info);
    });
    drag(this.$el);
  },
};
</script>

<style>
  /* CSS */
</style>
