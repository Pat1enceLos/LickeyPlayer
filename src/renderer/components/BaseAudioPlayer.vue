<template>
  <audio class="player" ref="audio" @loadedmetadata="onMetaLoaded" src="../../../test/assets/test.mp3"></audio>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'BaseAudioPlayer',
  data() {
    return {
      requestAnimationFrameId: 0,
    };
  },
  props: {
    updateCurrentTime: {
      type: Boolean,
      default: false,
    },
    currentTime: {
      type: Array,
      default: () => [0],
      validator: value => value[0] >= 0,
    },
  },
  computed: {
    ...mapGetters(['paused', 'volume']),
  },
  mounted() {
    if (this.updateCurrentTime) {
      this.requestAnimationFrameId = requestAnimationFrame(this.currentTimeUpdate);
    }
  },
  watch: {
    updateCurrentTime(newVal) {
      if (newVal) {
        this.requestAnimationFrameId = requestAnimationFrame(this.currentTimeUpdate);
      } else {
        cancelAnimationFrame(this.requestAnimationFrameId);
      }
    },
    currentTime(val) {
      this.$refs.audio.currentTime = val;
    },
    paused(val) {
      this.$refs.audio[val ? 'pause' : 'play']();
    },
    volume(val) {
      let validVolume = val;
      if (val > 100) {
        validVolume = 100;
      } else if (val < 0) {
        validVolume = 0;
      }
      this.$refs.audio.volume = validVolume / 100;
    },
  },
  methods: {
    currentTimeUpdate() {
      const { currentTime } = this.$refs.audio;
      this.$emit('update:currentTime', currentTime);
      this.requestAnimationFrameId = requestAnimationFrame(this.currentTimeUpdate);
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
