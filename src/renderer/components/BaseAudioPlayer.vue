<template>
  <audio class="player" ref="audio" @loadedmetadata="onMetaLoaded"></audio>
</template>

<script>
import { mapGetters } from 'vuex';
import fs from 'fs';

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
    ...mapGetters(['paused', 'volume', 'src', 'playlistQueue', 'duration', 'nextAudio', 'preAudio', 'audioInfo']),
  },
  created() {
    this.$bus.$on('next-audio', () => {
      if (fs.existsSync(this.nextAudio)) {
        this.$store.dispatch('updateSrc', this.nextAudio);
        setTimeout(() => {
          this.$refs.audio.play();
        }, 0);
      } else {
        setTimeout(() => {
          this.$store.dispatch('updatePaused', true);
        }, 1000);
        this.$store.dispatch('addNotifications', { content: '音乐文件已被销毁或移至别处', dismissAfter: 5000 });
        this.$store.dispatch('removeAudioInfoBySrc', this.nextAudio);
        this.$store.dispatch('removeMusicFromAll', this.nextAudio);
      }
    });
    this.$bus.$on('pre-audio', () => {
      if (fs.existsSync(this.preAudio)) {
        this.$store.dispatch('updateSrc', this.preAudio);
        setTimeout(() => {
          this.$refs.audio.play();
        }, 0);
      } else {
        setTimeout(() => {
          this.$store.dispatch('updatePaused', true);
        }, 1000);
        this.$store.dispatch('addNotifications', { content: '音乐文件已被销毁或移至别处', dismissAfter: 5000 });
        this.$store.dispatch('removeAudioInfoBySrc', this.preAudio);
        this.$store.dispatch('removeMusicFromAll', this.preAudio);
      }
    });
  },
  mounted() {
    if (this.updateCurrentTime) {
      this.requestAnimationFrameId = requestAnimationFrame(this.currentTimeUpdate);
    }
    this.$bus.$on('audioToPlay', () => {
      this.$refs.audio.play();
    });
  },
  watch: {
    src(val) {
      if (val) {
        this.$refs.audio.src = this.filePathToUrl(val);
        this.$refs.audio.play();
        this.$store.dispatch('updatePaused', false);
      } else {
        this.$refs.audio.src = '';
        this.$store.dispatch('updatePaused', true);
      }
    },
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
