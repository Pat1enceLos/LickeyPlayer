<template>
  <audio class="player" ref="audio" @loadedmetadata="onMetaLoaded" src="../../../test/assets/test.mp3"></audio>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'BaseAudioPlayer',
  props: {
  },
  computed: {
    ...mapGetters(['currentTime', 'paused', 'volume']),
  },
  mounted() {
    this.$refs.audio.ontimeupdate = this.currentTimeUpdate;
  },
  watch: {
    currentTime(val) {
      this.$refs.audio.currentTime = val;
    },
    paused(val) {
      this.$refs.audio[val ? 'pause' : 'play']();
    },
    volume(val) {
      this.$refs.audio.volume = val / 100;
    },
  },
  methods: {
    currentTimeUpdate() {
      this.$store.dispatch('updateCurrentTime', this.$refs.audio.currentTime);
    },
    onMetaLoaded(event) {
      this.$store.dispatch('updateDuration', event.target.duration);
    },
  },
};
</script>

<style scoped lang="scss">
  .player {
    width: 200px;
    height: 200px;
  }
</style>
