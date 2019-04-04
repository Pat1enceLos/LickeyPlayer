<template>
  <div class="playlistHandlerContainer">
    <div class="playlistPlayNow" :style="{ marginTop: '5px' }" @mouseup="handlePlaylistPlay">
      <div class="handlerText">Play Now</div>
    </div>
    <div class="playlistAddToQueue" @mouseup="addPlaylistToQueue">
      <div class="handlerText">Add To Queue</div>
    </div>
    <div class="addMusic" @mouseup="importMusicToPlaylist">
      <div class="handlerText">Import Music</div>
    </div>
    <div class="playlistExport">
      <div class="handlerText">Export List</div>
    </div>
    <div class="rename" @mouseup="playlistRename">
      <div class="handlerText">Rename</div>
    </div>
    <div class="playlistRemove" :style="{ marginBottom: '5px' }" @mouseup="removePlaylist">
      <div class="handlerText">Delete</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'playlistHandler',
  props: {
    name: {
      type: String,
    },
    rePlaylist: {
      type: String,
    },
    ifRightClick: {
      type: Boolean,
    },
  },
  computed: {
    ...mapGetters(['createdPlaylist']),
  },
  methods: {
    handlePlaylistPlay() {
      const playlist = this.createdPlaylist.find(item => item.name === this.name);
      if (playlist.src[0]) {
        this.$store.dispatch('updateCurrentPlaylistPlay', playlist.name);
        this.$store.dispatch('updateSrc', playlist.src[0]);
      }
      this.$emit('update:ifRightClick', false);
    },
    addPlaylistToQueue() {
      const playlist = this.createdPlaylist.find(item => item.name === this.name);
      this.$store.dispatch('updatePlaylistQueue', playlist.src);
      this.$emit('update:ifRightClick', false);
    },
    importMusicToPlaylist() {
      this.openFilesByDialog();
      this.$emit('update:ifRightClick', false);
    },
    playlistRename() {
      this.$emit('update:rePlaylist', this.name);
      this.$emit('update:ifRightClick', false);
    },
    removePlaylist() {
      this.$store.dispatch('removePlaylist', this.name);
      this.$emit('update:ifRightClick', false);
    },
  },
};
</script>

<style scoped lang="scss">
.playlistHandlerContainer {
  position: absolute;
  width: 150px;
  height: auto;
  background: #767676;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  z-index: 10;
  .playlistPlayNow, .playlistAddToQueue, .addMusic, .playlistExport, .rename, .playlistRemove {
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
