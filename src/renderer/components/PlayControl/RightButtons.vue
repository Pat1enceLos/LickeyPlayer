<template>
  <div class="rightButtons">
    <div class="content">
      <div class="button">
        <Icon :type="cycleType === 'single' ? 'singleCycle' : 'playlistCycle'" class="circle" @mouseup.native="handleCyclePlay" :style="{ opacity: cycleType !== '' ? '1' : '0.35' }"></Icon>
        <Icon type="random" class="random" @mouseup.native="handleRandomPlay":style="{ opacity: randomPlay ? '1' : '0.35' }"></Icon>
      </div>
      <div class="volumeControl">
        <Icon type="volume" v-show="volume !== 0" @mouseup.native="handleMute"></Icon>
        <Icon type="mute" v-show="volume === 0" @mouseup.native="handleVolumeRestore"></Icon>
        <div class="volume"
          @mousedown="handleMousedown">
          <div class="volumeCircle" ref="volumeCircle"
            @mousedown="handleCircleMousedown"
            @mouseup="handleCircleMouseup"
            :style="{
              left: manuControl ? `${932 + hoveredCurrentVolume * 1.2}px` : `${932 + volume * 1.2}px`,
            }"></div>
          <div class="volumeIndicator">
            <div class="nowVolume" :style="{
              width: manuControl ? `${hoveredCurrentVolume}%` : `${volume}%`,
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
      hoveredCurrentVolume: 0,
    };
  },
  computed: {
    ...mapGetters(['volume', 'lastVolume', 'cycleType', 'randomPlay']),
    manuControl() {
      return this.hoveredCurrentVolume !== 0;
    },
    randomPlay: {
      get() {
        return this.$store.getters.randomPlay;
      },
      set(val) {
        this.$store.dispatch('updateRandomPlay', val);
      },
    },
  },
  watch: {
    randomPlay(val) {
      if (val) {
        this.$store.dispatch('updateCycleType', '');
      }
    },
    cycleType(val) {
      if (val) {
        this.$store.dispatch('updateRandomPlay', false);
      }
    },
  },
  mounted() {
    window.addEventListener('mouseup', () => {
      this.isMousedown = false;
    });
    window.addEventListener('mousemove', (event) => {
      this.hoverdPageX = event.pageX;
      if (this.isMousedown) {
        if (this.hoverdPageX <= 935) {
          this.hoveredCurrentVolume = 0;
        } else if (this.hoverdPageX > 935 && this.hoverdPageX < 1055) {
          this.hoveredCurrentVolume = ((this.hoverdPageX - 935) / 120) * 100;
        } else {
          this.hoveredCurrentVolume = 100;
        }
        this.$store.dispatch('updateVolume', this.hoveredCurrentVolume);
        this.hoveredCurrentVolume = 0;
      }
    });
  },
  components: {
    Icon,
  },
  methods: {
    handleCyclePlay() {
      const typeArr = ['', 'single', 'playlist'];
      const index = typeArr.indexOf(this.cycleType);
      console.log(typeArr[index + 1] ? typeArr[index + 1] : typeArr[0]);
      this.$store.dispatch('updateCycleType', typeArr[index + 1] ? typeArr[index + 1] : typeArr[0]);
    },
    handleRandomPlay() {
      console.log(!this.randomPlay);
      this.randomPlay = !this.randomPlay;
    },
    handleMute() {
      this.$store.dispatch('updateMute');
    },
    handleVolumeRestore() {
      this.$store.dispatch('updateVolume', this.lastVolume);
    },
    handleCircleMousedown() {
      this.isMousedown = true;
    },
    handleMousedown(e) {
      if (e.target !== this.$refs.volumeCircle) {
        this.hoveredCurrentVolume = this.hoverdPageX > 935 ?
          ((this.hoverdPageX - 935) / 120) * 100 : 0;
        this.$store.dispatch('updateVolume', this.hoveredCurrentVolume);
        this.hoveredCurrentVolume = 0;
      }
    },
    handleCircleMouseup() {
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
        .volumeCircle {
          position: absolute;
          width: 10px;
          height: 10px;
          background: #FFCF2E;
          border-radius: 50%;
          margin-top: 5px;
          -webkit-transform: rotate(360deg);
          animation: rotation 8s linear infinite;
        }
        .volumeIndicator {
          width: 120px;
          height: 4px;
          margin: auto;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 2px;
          display: flex;
          .nowVolume {
            border-radius: 2px;
            background: #FFCF2E;
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
@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }to {
     -webkit-transform: rotate(360deg);
   }
}
</style>
