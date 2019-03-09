<template>
  <div class="container">
    <audio-control></audio-control>
  </div>
</template>

<script>
import AudioControl from './PlayControl/AudioControl';

export default {
  name: 'playControl',
  components: {
    'audio-control': AudioControl,
  },
};
</script>

<style scoped lang="scss">
  .container {
    width: 100%;
    height: 80px;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: row;
  }
</style>
