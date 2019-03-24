<template>
  <div class="songTable">
    <div class="topTitle">
      <div class="index">#</div>
      <div class="songTitle">Title</div>
      <div class="artists">Artist</div>
      <div class="album">Album</div>
      <div class="time">Time</div>
      <div class="fileType">File Type</div>
    </div>
    <div class="musicPlaylist">
      <div class="musicContainer"  v-for="(item, index) in displayPlaylist"
        @dblclick="dbClickToPlay(item)"
        @mouseup="handleMusicSettings($event, index)"
        :style="{
          background: index % 2 === 0 ? '#434343' : 'rgba(0, 0, 0, 0.1)',
        }">
        <div class="detailIndex" v-show="src !== item">{{ index + 1 }}</div>
        <Icon type="playing" v-show="src === item" class="playingIcon"></Icon>
        <div class="detailSongTitle">{{ getMusicName(item) }}</div>
        <div class="detailArtists">{{ 'test' }}</div>
        <div class="detailAlbum">Album</div>
        <div class="detailTime">Time</div>
        <div class="detailFileType">{{ getMusicFileType(item) }}</div>
      </div>
    </div>
    <music-handler v-show="ifRightClick" :style="{ left: `${handlerPosX}px`, top: `${handlerPosY}px` }" ref="handler"></music-handler>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import path from 'path';
import MusicHandler from './MusicHandler';
import Icon from '../BaseIconContainer';

export default {
  name: 'SongsTable',
  data() {
    return {
      ifRightClick: false,
      handlerPosX: 0,
      handlerPosY: 0,
      handlerIndex: -1,
    };
  },
  created() {
    window.addEventListener('mousedown', (e) => {
      if (e.target !== this.$refs.handler) {
        this.ifRightClick = false;
        this.handlerPosX = 0;
        this.handlerPosY = 0;
        this.handlerIndex = -1;
      }
    });
  },
  components: {
    'music-handler': MusicHandler,
    Icon,
  },
  computed: {
    ...mapGetters(['playlistQueue', 'playlistQueueToShow', 'src']),
    displayPlaylist() {
      return this.playlistQueueToShow ? this.playlistQueue : '';
    },
  },
  methods: {
    dbClickToPlay(src) {
      this.$store.dispatch('updateSrc', src);
    },
    handleMusicSettings(e, index) {
      if (e.button === 2) {
        this.handlerPosX = e.clientX;
        this.handlerPosY = e.clientY;
        this.handlerIndex = index;
        this.ifRightClick = true;
      }
      console.log(e.clientX, e.clientY);
    },
    getMusicName(item) {
      const basename = path.basename(item);
      return basename.slice(0, basename.lastIndexOf('.'));
    },
    getMusicFileType(item) {
      const basename = path.basename(item);
      return basename.slice(basename.lastIndexOf('.') + 1, basename.length);
    },
  },
};
</script>

<style scoped lang="scss">
.songTable {
  width: 98.5%;
  height: 99%;
  margin: auto;
  overflow: hidden;
  background: #434343;
  display: flex;
  flex-direction: column;
  .topTitle {
    width: 100%;
    height: 40px;
    background: rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: row;
    color: rgba(255, 255, 255, 1);
    font-size: 13px;
    text-align: center;
    .index {
      width: 5%;
      margin: auto;
    }
    .songTitle, .artists, .album, .time, .fileType {
      width: 19%;
      margin: auto;
    }
  }
  .musicPlaylist {
    width: 100%;
    height: auto;
    text-align: center;
    overflow: scroll;
    .musicContainer {
      width: 100%;
      height: 35px;
      display: flex;
      flex-direction: row;
      color: rgba(255, 255, 255, 1);
      font-size: 12px;
    }
    .detailIndex {
      width: 5%;
      margin: auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .playingIcon {
      width: 5%;
      margin: auto;
      display: flex;
    }
    .detailSongTitle, .detailArtists, .detailAlbum, .detailTime, .detailFileType {
      width: 19%;
      margin: auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
