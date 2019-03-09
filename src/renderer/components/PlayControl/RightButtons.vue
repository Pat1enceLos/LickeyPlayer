<template>
  <div class="rightButtons">
    <div class="content">
      <div class="button">
        <Icon type="circle" class="circle"></Icon>
        <Icon type="random" class="random"></Icon>
      </div>
      <div class="volumeControl">
        <Icon type="volume"></Icon>
        <div class="volumeIndicator"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '../BaseIconContainer.vue';

export default {
  name: 'RightButtons',
  components: {
    Icon,
  },
};
</script>

<style scoped lang="scss">
.rightButtons {
  width: 260px;
  height: 80px;
  display: flex;
  .content {
    width: 100%;
    height: 20px;
    margin: 28px auto auto auto;
    display: flex;
    flex-direction: row;
    .button {
      width: 80px;
      height: 100%;
      display: flex;
      flex-direction: row;
      .circle {
        margin-left: 20px;
      }
      .random {
        margin-left: 10px;
     }
    }
    .volumeControl {
      width: 170px;
      height: 100%;
      display: flex;
      flex-direction: row;
      margin-left: 10px;
      .volumeIndicator {
        width: 120px;
        height: 4px;
        margin: auto 5px auto 5px;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 2px;
      }
    }
  }
}
</style>
