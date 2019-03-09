<template>
  <div class="playlistControl">
    <audio-control></audio-control>
    <the-progress-bar></the-progress-bar>
    <right-buttons></right-buttons>
  </div>
</template>

<script>
import AudioControl from './PlayControl/AudioControl';
import TheProgressBar from './PlayControl/TheProgressBar';
import RightButtons from './PlayControl/RightButtons';

export default {
  name: 'playControl',
  components: {
    'audio-control': AudioControl,
    'the-progress-bar': TheProgressBar,
    'right-buttons': RightButtons,
  },
};
</script>

<style scoped lang="scss">
  .playlistControl {
    width: 100%;
    height: 80px;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: row;
  }
</style>
