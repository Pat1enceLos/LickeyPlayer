<template>
  <div class="mainContent no-drag">
    <left-list :style="{ width: `${disXLeft}px` }"></left-list>
    <div class="leftResizer" @mousedown="handleMousedownLeft" @mouseup="handleMouseupLeft"
      :style="{ left: `${disXLeft}px` }"></div>
    <play-list></play-list>
    <right-settings></right-settings>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import leftList from './mainContent/LeftList';
import rightSettings from './mainContent/RightSettings';
import playlist from './mainContent/Playlist';

export default {
  name: 'mainContent',
  data() {
    return {
      isMousedownLeft: false,
      isMousedownRight: false,
    };
  },
  components: {
    'left-list': leftList,
    'right-settings': rightSettings,
    'play-list': playlist,
  },
  computed: {
    ...mapGetters(['disXLeft']),
  },
  mounted() {
    window.addEventListener('mousemove', (e) => {
      if (this.isMousedownLeft) {
        if (e.clientX <= 165) {
          this.$store.dispatch('updateDisXLeft', 165);
        } else if (e.clientX > 165 && e.clientX < 300) {
          this.$store.dispatch('updateDisXLeft', e.clientX);
        } else if (e.clientX >= 300) {
          this.$store.dispatch('updateDisXLeft', 300);
        }
      }
    });
    window.addEventListener('mouseup', () => {
      this.isMousedownLeft = false;
      this.isMousedownRight = false;
    });
  },
  methods: {
    handleMousedownLeft() {
      this.isMousedownLeft = true;
    },
    handleMouseupLeft() {
      this.isMousedownLeft = false;
    },
  },
};
</script>

<style scoped lang="scss">
  .mainContent {
    width: 100%;
    height: 560px;
    display: flex;
    flex-direction: row;
    .leftResizer {
      position: absolute;
      width: 1px;
      height: 560px;
      background: black;
      -webkit-app-region: no-drag;
      cursor: e-resize;
    }
  }
</style>
