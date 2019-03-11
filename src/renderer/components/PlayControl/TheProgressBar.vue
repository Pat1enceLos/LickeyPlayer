<template>
  <div class="theProgressBar">
    <div class="content">
      <div class="playTime">{{ timeFormatter(currentTime) }}</div>
      <div class="processControl"
        @mousedown="handleMousedown"
        @mouseup="handleMouseup">
        <div class="progressBar">
          <div class="played" :style="{
            width: `${playedPercent}%`,
          }"></div>
          <div class="default" :style="{
          }"></div>
        </div>
      </div>
      <div class="allTime">{{ timeFormatter(duration) }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TheProgressBar',
  data() {
    return {
      hoverdPageX: 0,
      playedPercent: 0,
      isMousedown: false,
    };
  },
  computed: {
    ...mapGetters(['duration', 'currentTime', 'volume']),
  },
  watch: {
    playedPercent(val) {
      this.$store.dispatch('updateCurrentTime', (val / 100) * this.duration);
    },
    currentTime(val) {
      this.playedPercent = (val / this.duration) * 100;
    },
  },
  mounted() {
    window.addEventListener('mouseup', () => {
      this.isMousedown = false;
    });
    window.addEventListener('mousemove', (event) => {
      this.hoverdPageX = event.pageX;
      if (this.isMousedown) {
        this.playedPercent = this.hoverdPageX > 265 ? ((this.hoverdPageX - 265) / 500) * 100 : 0;
      }
    });
  },
  methods: {
    handleMousedown() {
      this.isMousedown = true;
      this.playedPercent = this.hoverdPageX > 265 ? ((this.hoverdPageX - 265) / 500) * 100 : 0;
    },
    handleMouseup() {
      this.isMousedown = false;
    },
  },
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
        width: 40px;
        color: white;
        font-size: 12px;
        text-align: center;
        margin-right: 10px;
      }
      .processControl {
        width: 510px;
        height: 20px;
        display: flex;
        margin-right: 10px;
        .progressBar {
          width: 500px;
          height: 4px;
          margin: auto;
          border-radius: 2px;
          display: flex;
          flex-direction: row;
          background: rgba(255, 255, 255, 0.8);
          .played {
            border-radius: 2px;
            background: rgba(0, 0, 0, 0.8);
          }
          .default {
            flex: 1;
            border-radius: 2px;
            background: rgba(255, 255, 255, 0.8);
          }
        }
      }
      .allTime {
        width: 40px;
        color: white;
        font-size: 12px;
      }
    }
  }
</style>
