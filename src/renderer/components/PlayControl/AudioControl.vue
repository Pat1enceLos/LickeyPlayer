<template>
  <div class="audioControl">
    <div class="playbutton">
      <Icon type="pre" class="pre"></Icon>
      <Icon type="play" class="play"></Icon>
      <Icon type="pause" class="pause" v-show="false"></Icon>
      <Icon type="next" class="next"></Icon>
    </div>
  </div>
</template>

<script>
import Icon from '../BaseIconContainer';

export default {
  name: 'AudioControl',
  components: {
    Icon,
  },
};
</script>

<style scoped lang="scss">
.audioControl {
  width: 210px;
  height: 80px;
  display: flex;
  .playbutton {
    width: 140px;
    height: 40px;
    display: flex;
    margin: auto;
    .play, .pause {
      margin: auto;
    }
    .pre {
      margin-top: 7.5px;
      margin-left: 0;
    }
    .next {
      margin-top: 7.5px;
      margin-right: 0;
    }
  }
}
</style>
