<template>
  <div class="playlist" ref="playlistDrop">
    <base-audio-player :updateCurrentTime="true" :currentTime="seekTime" @update:currentTime="updateCurrentTime"></base-audio-player>
    <songs-table v-show="displayType"></songs-table>
    <songs-image v-show="!displayType"></songs-image>
  </div>
</template>

<script>
import fs from 'fs';
import { mapActions, mapGetters } from 'vuex';
import BaseAudioPlayer from '../BaseAudioPlayer';
import SongsTable from './SongsTable';
import SongsImage from './SongsImage';

export default {
  name: 'playlist',
  data() {
    return {
      seekTime: [0],
    };
  },
  computed: {
    ...mapGetters(['currentTime', 'duration', 'displayType', 'currentPlaylistShow']),
  },
  components: {
    'base-audio-player': BaseAudioPlayer,
    'songs-table': SongsTable,
    'songs-image': SongsImage,
  },
  mounted() {
    this.$bus.$on('seek', (e) => {
      this.seekTime = [e];
    });
    this.$refs.playlistDrop.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    this.$refs.playlistDrop.addEventListener('dragleave', (e) => {
      e.preventDefault();
    });
    this.$refs.playlistDrop.addEventListener('drop', (e) => {
      e.preventDefault();
      const files = Array.prototype.map.call(e.dataTransfer.files, f => f.path);
      const onlyFolders = files.every(file => fs.statSync(file).isDirectory());
      files.forEach(file => this.$electron.remote.app.addRecentDocument(file));
      if (onlyFolders) {
        if (this.currentPlaylistShow === 'playlistQueue') {
          this.openFolders(...files);
        } else {
          this.importFolders(...files);
        }
      } else if (this.currentPlaylistShow === 'playlistQueue') {
        this.openFiles(...files);
      } else {
        this.importFiles(...files);
      }
    });
  },
  watch: {
    currentTime(val) {
      if (val + 1 >= this.duration) {
        this.$bus.$emit('next-audio');
      }
    },
  },
  methods: {
    ...mapActions({
      updateCurrentTime: 'updateCurrentTime',
    }),
  },
};
</script>

<style scoped lang="scss">
  .playlist {
    flex: 1;
    /*width: 660px;*/
    overflow: hidden;
    height: 100%;
    background: #505050;
    display: flex;
  }
</style>
