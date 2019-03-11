<template>
  <div class="rightButtons">
    <div class="content">
      <div class="button">
        <Icon type="circle" class="circle"></Icon>
        <Icon type="random" class="random"></Icon>
      </div>
      <div class="volumeControl">
        <Icon type="volume"></Icon>
        <div class="volume"
          @mousedown="handleMousedown"
          @mouseup="handleMouseup">
          <div class="volumeIndicator">
            <div class="nowVolume" :style="{
              width: `${volume}%`,
            }"></div>
            <div class="maxVolume"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Icon from '../BaseIconContainer.vue';

export default {
  name: 'RightButtons',
  data() {
    return {
      hoverdPageX: 0,
      isMousedown: false,
      volumePercent: 0,
    };
  },
  computed: {
    ...mapGetters(['volume']),
  },
  watch: {
    volumePercent(val) {
      this.$store.dispatch('updateVolume', val);
    },
    volume(val) {
      this.volumePercent = val;
    },
  },
  mounted() {
    window.addEventListener('mouseup', () => {
      this.isMousedown = false;
    });
    window.addEventListener('mousemove', (event) => {
      this.hoverdPageX = event.pageX;
      if (this.isMousedown) {
        this.volumePercent = this.hoverdPageX > 935 ? ((this.hoverdPageX - 935) / 120) * 100 : 0;
      }
    });
  },
  components: {
    Icon,
  },
  methods: {
    handleMousedown() {
      this.isMousedown = true;
      this.volumePercent = this.hoverdPageX > 935 ? ((this.hoverdPageX - 935) / 120) * 100 : 0;
    },
    handleMouseup() {
      this.isMousedown = false;
    },
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
      .volume {
        width: 130px;
        height: 20px;
        display: flex;
        .volumeIndicator {
          width: 120px;
          height: 4px;
          margin: auto;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 2px;
          display: flex;
          .nowVolume {
            border-radius: 2px;
            background: rgba(0, 0, 0, 0.8);
          }
          .maxVolume {
            flex: 1;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 2px;
          }
        }
      }
    }
  }
}
</style>
