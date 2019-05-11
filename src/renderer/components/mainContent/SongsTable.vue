<template>
  <div class="songTable" :style="{
    height: albumPlaylist && albumPlaylist.length ? 'auto' : '100%',
    marginBottom: albumPlaylist && albumPlaylist.length ? '20px' : '',
  }">
    <div class="topTitle">
      <div class="index">#</div>
      <div class="songTitle">Title</div>
      <div class="artists">Artist</div>
      <div class="album">Album</div>
      <div class="time">Time</div>
      <div class="fileType">File Type</div>
    </div>
    <div class="musicPlaylist" :style="{ overflowY: displayPlaylist.length > 13 ? 'scroll': '' }">
      <div class="musicContainer"  v-for="(item, index) in displayPlaylist"
        @dblclick="dbClickToPlay(item)"
        @mouseup="handleMusicSettings($event, index, item)"
        :style="{
          background: src === item && currentPlaylistShow === currentPlaylistPlay ? '#606060' :index % 2 === 0 ? '#434343' : 'rgba(0, 0, 0, 0.1)',
        }">
        <div class="detailIndex" v-show="src !== item || currentPlaylistShow !== currentPlaylistPlay">{{ index + 1 }}</div>
        <Icon type="playing" v-show="src === item && currentPlaylistShow === currentPlaylistPlay" class="playingIcon"></Icon>
        <div class="detailSongTitle">{{ title(item) }}</div>
        <div class="detailArtists">{{ artist(item) }}</div>
        <div class="detailAlbum">{{ album(item) }}</div>
        <div class="detailTime">{{ timeFormatter(duration(item)) }}</div>
        <div class="detailFileType">{{ fileType(item) }}</div>
      </div>
    </div>
    <music-handler v-show="ifRightClick" :ifRightClick.sync="ifRightClick" :style="{ left: `${handlerPosX}px`, top: `${handlerPosY}px` }" ref="handler" :musicSrc="handlerSrc"></music-handler>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';
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
      handlerSrc: '',
      isSearch: false,
      handlerClassLists: ['handlerText', 'playNow', 'addToQueue', 'addToPlaylist', 'remove', 'handlerContainer', 'audioInfo', 'playlistDetail', 'playlistContainer', 'content'],
    };
  },
  props: {
    albumPlaylist: {
      type: Array,
    },
  },
  created() {
    window.addEventListener('mousedown', (e) => {
      if (!this.handlerClassLists.includes(e.target.className)) {
        this.ifRightClick = false;
        this.handlerPosX = 0;
        this.handlerPosY = 0;
        this.handlerIndex = -1;
        this.handlerSrc = '';
      }
    });
  },
  mounted() {
    this.$bus.$on('search-tips', (key) => {
      this.isSearch = key !== '';
    });
  },
  components: {
    'music-handler': MusicHandler,
    Icon,
  },
  computed: {
    ...mapGetters(['playlistQueue', 'src', 'musicLibraryPlaylist', 'createdPlaylist', 'audioInfo', 'currentPlaylistShow', 'currentPlaylistPlay', 'fullTitleSearcher', 'fullArtistSearcher', 'fullAlbumSearcher']),
    displayPlaylist() {
      if (this.albumPlaylist && this.albumPlaylist.length) {
        return this.albumPlaylist;
      }
      if (!this.isSearch) {
        if (this.currentPlaylistShow === 'playlistQueue') {
          return this.playlistQueue;
        } else if (this.currentPlaylistShow === 'musicLibrary') {
          return this.musicLibraryPlaylist;
        }
        return this.createdPlaylist.find(i => i.name === this.currentPlaylistShow) ?
          this.createdPlaylist.find(i => i.name === this.currentPlaylistShow).src : [];
      }
      const tmp = this.fullTitleSearcher.concat(this.fullArtistSearcher, this.fullAlbumSearcher);
      return _.uniqWith(tmp, _.isEqual)
        .map(i => i.src);
    },
  },
  methods: {
    dbClickToPlay(src) {
      this.$store.dispatch('updateSrc', src);
      this.$store.dispatch('updateCurrentPlaylistPlay', this.currentPlaylistShow);
      this.$store.dispatch('updatePaused', false);
    },
    handleMusicSettings(e, index, src) {
      if (e.button === 2) {
        this.handlerPosX = e.clientX;
        this.handlerPosY = e.clientY;
        this.handlerIndex = index;
        this.ifRightClick = true;
        this.handlerSrc = src;
      }
    },
    fixedAudioInfo(src) {
      return this.audioInfo.find(item => item.src === src);
    },
    title(item) {
      return this.fixedAudioInfo(item) ? this.fixedAudioInfo(item).title : 'null';
    },
    artist(item) {
      return this.fixedAudioInfo(item) ? this.fixedAudioInfo(item).artists : 'null';
    },
    album(item) {
      return this.fixedAudioInfo(item) ? this.fixedAudioInfo(item).album : 'null';
    },
    duration(item) {
      return this.fixedAudioInfo(item) ? this.fixedAudioInfo(item).duration : 'null';
    },
    fileType(item) {
      return this.fixedAudioInfo(item) ? this.fixedAudioInfo(item).fileType : 'null';
    },
  },
};
</script>

<style scoped lang="scss">
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}
.songTable {
  width: 100%;
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
