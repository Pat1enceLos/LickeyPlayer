<template>
  <div class="theProgressBar">
    <div class="content">
      <div class="playTime">{{ '01 : 11' }}</div>
      <div class="progressBar"></div>
      <div class="allTime">{{ '05 : 00' }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheProgressBar',
};
</script>

<style scoped lang="scss">
  .theProgressBar {
    width: 610px;
    height: 80px;
    display: flex;
    .content {
      width: 100%;
      height: 20px;
      display: flex;
      margin: auto;
      flex-direction: row;
      justify-content: space-around;
      .playTime {
        width: auto;
        color: white;
        font-size: 12px;
        margin-right: 15px;
      }
      .progressBar {
        width: 500px;
        height: 6px;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 5px;
        margin-top: 6px;
        margin-right: 15px;
      }
      .allTime {
        width: auto;
        color: white;
        font-size: 12px;
      }
    }
  }
</style>
