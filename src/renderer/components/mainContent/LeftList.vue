<template>
  <div class="leftList">
    <div class="topContainer">
      <div class="library" :style="{ background: currentPlaylistShow === 'musicLibrary' ? 'rgb(67, 67, 67)' : '' }">
        <Icon type="music" class="libLogo"></Icon>
        <div class="libText" @mouseup="showMusicLibrary">Music Library</div>
      </div>
      <div class="queue" :style="{ background: currentPlaylistShow === 'playlistQueue' ? 'rgb(67, 67, 67)' : ''}">
        <Icon type="queue" class="queLogo"></Icon>
        <div class="queText" @mouseup="showPlaylistQueue">Playback Queue</div>
      </div>
      <div class="switch">
        <Icon type="switch" class="switchLogo"></Icon>
        <div class="switchText" @mouseup="handleDisplayType">Switch Display</div>
      </div>
      <div class="import">
        <Icon type="import" class="importLogo"></Icon>
        <div class="importText" @mouseup="musicImport">Music Import</div>
      </div>
      <!--<div class="export">-->
        <!--<Icon type="export" class="exportLogo"></Icon>-->
        <!--<div class="exportText">Music Export</div>-->
      <!--</div>-->
    </div>
    <div class="separate">
      <div class="seText">MY PLAYLIST</div>
      <Icon type="addPlaylist" class="addLogo" @mouseup.native="addCreatedPlaylist"></Icon>
    </div>
    <div class="createdPlaylist">
      <div class="playlistContainer"
        v-for="(item, index) in createdPlaylist"
        @mouseup="handlePlaylist($event, index, item)"
        @dblclick="handleCreatedPlaylistPlay(item)"
        :style="{ background: item.name === currentPlaylistShow ? 'rgb(67, 67, 67)' : ''}">
        <div class="selectedMark" v-show="item.name === currentPlaylistPlay"></div>
        <div class="content">
          <Icon type="queue" class="playlistIcon"></Icon>
          <div class="playlistText">{{ item.name }}</div>
        </div>
      </div>
    </div>
    <div class="playlistInput" v-show="inputToShow">
      <Icon type="queue" class="playlistIcon"></Icon>
      <input class="nameInput" @blur="handleInput" @keypress="handleKeyInput"/>
    </div>
    <playlist-handler v-show="ifRightClick" :ifRightClick.sync="ifRightClick" :style="{ left: `${handlerPosX}px`, top: `${handlerPosY}px` }" ref="playlistHandler" :name="handlerPlaylistName"></playlist-handler>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Icon from '../BaseIconContainer';
import PlaylistHandler from './PlaylistHandler';

export default {
  name: 'leftList',
  data() {
    return {
      handlerPosX: 0,
      handlerPosY: 0,
      handlerIndex: -1,
      ifRightClick: false,
      handlerPlaylistName: '',
      handlerClassLists: ['playlistHandlerContainer', 'playlistPlayNow', 'addMusic', 'rename', 'playlistRemove', 'currentPlaylistShow'],
      inputToShow: false,
    };
  },
  created() {
    window.addEventListener('mousedown', (e) => {
      if (!this.handlerClassLists.includes(e.target.className)) {
        this.ifRightClick = false;
        this.handlerPosX = 0;
        this.handlerPosY = 0;
        this.handlerIndex = -1;
        this.handlerPlaylistName = '';
      }
    });
  },
  components: {
    Icon,
    'playlist-handler': PlaylistHandler,
  },
  computed: {
    ...mapGetters(['createdPlaylist', 'createdPlaylist', 'currentPlaylistPlay', 'currentPlaylistShow']),
  },
  watch: {
  },
  methods: {
    handleCreatedPlaylistPlay(item) {
      if (item.src[0]) {
        this.$store.dispatch('updateCurrentPlaylistPlay', item.name);
        this.$store.dispatch('updateSrc', item.src[0]);
      }
    },
    handlePlaylist(e, index, item) {
      this.$store.dispatch('updateCurrentPlaylistShow', item.name);
      if (e.button === 2) {
        this.handlerPosX = e.clientX;
        this.handlerPosY = e.clientY;
        this.handlerIndex = index;
        this.ifRightClick = true;
        this.handlerPlaylistName = item.name;
      }
    },
    musicImport() {
      this.openFilesByDialog();
    },
    showPlaylistQueue() {
      this.$store.dispatch('updateCurrentPlaylistShow', 'playlistQueue');
    },
    showMusicLibrary() {
      this.$store.dispatch('updateCurrentPlaylistShow', 'musicLibrary');
    },
    handleDisplayType() {
      this.$store.dispatch('updateDisplayType');
    },
    addCreatedPlaylist() {
      if (!this.inputToShow) {
        this.inputToShow = true;
        setTimeout(() => {
          document.querySelector('.nameInput').focus();
        }, 0);
      }
    },
    handleInput() {
      const inputName = document.querySelector('.nameInput').value;
      if (inputName !== '') {
        let duplicate = false;
        this.createdPlaylist.forEach((item) => {
          if (item.name === inputName) {
            duplicate = true;
          }
        });
        if (!duplicate) {
          this.$store.dispatch('updateCreatedPlaylist', inputName);
          this.inputToShow = false;
          document.querySelector('.nameInput').value = '';
        } else {
          alert('已存在该播放列表');
        }
      } else {
        this.inputToShow = false;
      }
    },
    handleKeyInput(e) {
      const inputName = document.querySelector('.nameInput').value;
      if (e.key === 'Enter' && inputName !== '') {
        let duplicate = false;
        this.createdPlaylist.forEach((item) => {
          if (item.name === inputName) {
            duplicate = true;
          }
        });
        if (!duplicate) {
          this.$store.dispatch('updateCreatedPlaylist', inputName);
          this.inputToShow = false;
          document.querySelector('.nameInput').value = '';
        } else {
          alert('已存在该播放列表');
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
  .leftList {
    width: 100%;
    height: 100%;
    min-width: 100px;
    background: #707070;
    display: flex;
    flex-direction: column;
    .topContainer {
      width: 100%;
      min-width: 150px;
      height: 140px;
      display: flex;
      flex-direction: column;
      font-size: 12px;
      color: rgba(255, 255, 255, 1);
      letter-spacing: 0.4px;
      /*margin: 10px auto 10px 10px;*/
      overflow: hidden;
      white-space: nowrap;
      .library {
        flex: 1;
        display: flex;
        margin-top: 10px;
        .libText {
          cursor: pointer;
          margin: auto auto auto 10px;
        }
        .libLogo {
          width: 15px;
          height: 15px;
          margin: auto 0 auto 20px;
          display: flex;
        }
      }
      .queue {
        flex: 1;
        display: flex;
        .queText {
          cursor: pointer;
          margin: auto auto auto 10px;
        }
        .queLogo {
          width: 15px;
          height: 15px;
          margin: auto 0 auto 20px;
          display: flex;
        }
      }
      .switch {
        flex: 1;
        display: flex;
        .switchText {
          cursor: pointer;
          margin: auto auto auto 10px;
        }
        .switchLogo {
          width: 15px;
          height: 15px;
          margin: auto 0 auto 20px;
          display: flex;
        }
      }
      .import {
        flex: 1;
        display: flex;
        margin-bottom: 10px;
        .importText {
          cursor: pointer;
          margin: auto auto auto 10px;
        }
        .importLogo {
          width: 15px;
          height: 15px;
          margin: auto 0 auto 20px;
          display: flex;
        }
      }
      .export {
        flex: 1;
        display: flex;
        margin-bottom: 10px;
        .exportText {
          cursor: pointer;
          margin: auto auto auto 10px;
        }
        .exportLogo {
          width: 15px;
          height: 15px;
          margin: auto 0 auto 20px;
          display: flex;
        }
      }
    }
    .separate {
      width: 100%;
      height: 35px;
      background: rgb(75, 75, 75);
      display: flex;
      margin-bottom: 5px;
      .seText {
        color: rgba(255, 255, 255, 1);
        font-size: 13px;
        margin: auto 0 auto 20px;
      }
      .addLogo {
        width: 30px;
        height: 100%;
        margin: auto 20px auto auto;
        display: flex;
      }
    }
    .createdPlaylist {
      width: 100%;
      height: auto;
      max-height: 300px;
      overflow: scroll;
      .playlistContainer {
        width: 100%;
        height: 30px;
        display: flex;
        .selectedMark {
          width: 3px;
          height: 70%;
          background: #FFCF2E;
          margin: auto -3px auto 0;
        }
        .content {
          margin: auto auto auto 17px;
          display: flex;
          flex-direction: row;
          .playlistIcon {
            width: 15px;
            height: 15px;
            display: flex;
            margin: auto 0 auto 0;
          }
          .playlistText {
            text-align: center;
            font-size: 13px;
            color: rgba(255, 255, 255, 1);
            margin: auto auto auto 10px;
            cursor: pointer;
          }
        }
      }
    }
    .playlistInput {
      width: 100%;
      height: 30px;
      display: flex;
      flex-direction: row;
      .playlistIcon {
        width: 15px;
        height: 15px;
        display: flex;
        margin: auto 10px auto 20px;
      }
      .nameInput {
        width: 60%;
        height: 20px;
        font-size: 13px;
        margin: auto auto auto 0;
        background: rgba(255, 255, 255, 1);
        border-radius: 3px;
        text-indent: 3px;
        outline: none;
        border: none;
      }
    }
  }
</style>
