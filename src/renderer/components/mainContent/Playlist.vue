<template>
  <div class="playlist">
    <base-audio-player :updateCurrentTime="true" :currentTime="seekTime" @update:currentTime="updateCurrentTime"></base-audio-player>
    <songs-table></songs-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BaseAudioPlayer from '../BaseAudioPlayer';
import SongsTable from './SongsTable';

export default {
  name: 'playlist',
  data() {
    return {
      seekTime: [0],
    };
  },
  computed: {
    ...mapGetters(['currentTime', 'duration']),
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
    background: rgba(0, 0, 0, 0.1);
  }
</style>
