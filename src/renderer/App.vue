<template>
  <div id="app" class="application">
    <router-view></router-view>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapGetters } from 'vuex';
import nickname from 'nickname';
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
            const initialName = nickname.random();
            this.$store.dispatch('updateBirth', initialBirth);
            this.$store.dispatch('updateGender', '其他');
            this.$store.dispatch('updateName', initialName);
            this.$store.dispatch('updateDescription', '这个人很懒，什么都没有留下。。');
            this.storeQueueHandler({
              table: 'User',
              data: {
                gender: '其他', birth: initialBirth, description: '这个人很懒，什么都没有留下。。', name: initialName,
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
    drag(this.$el);
  },
};
</script>

<style>
  /* CSS */
</style>
