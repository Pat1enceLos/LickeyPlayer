<template>
  <div class="playlist">
    <base-audio-player></base-audio-player>
  </div>
</template>

<script>
import BaseAudioPlayer from '../BaseAudioPlayer';

export default {
  name: 'playlist',
  components: {
    'base-audio-player': BaseAudioPlayer,
  },
};
</script>

<style scoped lang="scss">
  .playlist {
    width: 660px;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
  }
</style>
