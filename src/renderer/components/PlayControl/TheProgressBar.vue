<template>
  <div class="theProgressBar" :data-component-name="$options.name">
    <div class="content">
      <div class="playTime">{{ timeFormatter(currentTime) }}</div>
      <div class="processControl"
        @mousedown="handleMousedown">
        <div class="circle" ref="circle"
          @mousedown="handleCircleMousedown"
          @mouseup="handleCircleMouseup"
          :style="{
            left: `${260 + playedPercent * 5}px`,
          }"></div>
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
      isMousedown: false,
      isMouseMove: false,
      hoveredCurrentTime: 0,
    };
  },
  computed: {
    ...mapGetters(['duration', 'currentTime', 'volume']),
    playedPercent() {
      return (this.hoveredCurrentTime / this.duration) * 100;
    },
  },
  watch: {
  },
  mounted() {
    window.addEventListener('mouseup', () => {
      this.isMousedown = false;
      if (this.isMouseMove) {
        this.isMouseMove = false;
        this.$bus.$emit('seek', this.hoveredCurrentTime);
      }
    });
    window.addEventListener('mousemove', (event) => {
      this.hoverdPageX = event.pageX;
      if (this.isMousedown) {
        this.isMouseMove = true;
        this.hoveredCurrentTime = this.hoverdPageX > 265 ?
          ((this.hoverdPageX - 265) / 500) * this.duration : 0;
      }
    });
  },
  methods: {
    handleCircleMousedown() {
      this.isMousedown = true;
    },
    handleMousedown(e) {
      if (e.target !== this.$refs.circle) {
        this.hoveredCurrentTime = this.hoverdPageX > 265 ?
          ((this.hoverdPageX - 265) / 500) * this.duration : 0;
        this.$bus.$emit('seek', this.hoveredCurrentTime);
      }
    },
    handleCircleMouseup() {
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
        .circle {
          position: absolute;
          width: 14px;
          height: 14px;
          background: rgba(0, 0, 0, 1);
          border-radius: 50%;
          margin-top: 3px;
          -webkit-transform: rotate(360deg);
          animation: rotation 8s linear infinite;
        }
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
@-webkit-keyframes rotation {
  from {-webkit-transform: rotate(0deg);
  }to {
     -webkit-transform: rotate(360deg);
   }}
</style>
