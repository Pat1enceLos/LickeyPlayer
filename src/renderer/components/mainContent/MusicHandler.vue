<template>
  <div class="handlerContainer">
    <div class="playNow" @mouseup="handlePlayNow" :style="{ marginTop: '5px' }">
      <div class="handlerText">Play Now</div>
    </div>
    <div class="addToQueue" v-show="!playlistQueueToShow">
      <div class="handlerText">Add To Queue</div>
    </div>
    <div class="addToPlaylist">
      <div class="handlerText">Add To Playlist</div>
    </div>
    <div class="reveal">
      <div class="handlerText">Reveal In Finder</div>
    </div>
    <div class="remove" @mouseup="handleRemove" :style="{ marginBottom: '5px' }">
      <div class="handlerText">Remove</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MusicHandler',
  props: {
    musicSrc: {
      type: String,
    },
    ifRightClick: {
      type: Boolean,
    },
  },
  computed: {
    ...mapGetters(['playlistQueueToShow', 'musicLibraryToShow', 'src']),
  },
  methods: {
    handlePlayNow() {
      this.$store.dispatch('updateSrc', this.musicSrc);
      this.$store.dispatch('updatePaused', false);
      this.$emit('update:ifRightClick', false);
    },
    handleRemove() {
      if (this.playlistQueueToShow) {
        this.$store.dispatch('removeMusicFromQueue', this.musicSrc);
      } else if (this.musicLibraryToShow) {
        this.$store.dispatch('removeMusicFromLibrary', this.musicSrc);
      }
      this.$emit('update:ifRightClick', false);
    },
  },
};
</script>

<style scoped lang="scss">
.handlerContainer {
  position: absolute;
  width: 180px;
  height: auto;
  background: #707070;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  .playNow, .addToQueue, .addToPlaylist, .remove, .reveal {
    width: 100%;
    height: 30px;
    color: rgba(255, 255, 255, 1);
    font-size: 13px;
    display: flex;
    &:hover {
      background: #434343;
    }
  }
  .handlerText {
    margin: auto auto auto 15px;
  }
}
</style>
