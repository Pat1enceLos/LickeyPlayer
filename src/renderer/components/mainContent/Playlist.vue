<template>
  <div class="playlist">
    <base-audio-player :updateCurrentTime="true" :currentTime="seekTime" @update:currentTime="updateCurrentTime"></base-audio-player>
    <songs-table></songs-table>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import BaseAudioPlayer from '../BaseAudioPlayer';
import SongsTable from './SongsTable';

export default {
  name: 'playlist',
  data() {
    return {
      seekTime: [0],
    };
  },
  components: {
    'base-audio-player': BaseAudioPlayer,
    'songs-table': SongsTable,
  },
  mounted() {
    this.$bus.$on('seek', (e) => {
      this.seekTime = [e];
    });
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
    background: rgba(0, 0, 0, 0.1);
  }
</style>
