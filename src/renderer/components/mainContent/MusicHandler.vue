<template>
  <div class="handlerContainer">
    <div class="playNow" @mouseup="handlePlayNow" :style="{ marginTop: '5px' }">
      <div class="handlerText">Play Now</div>
    </div>
    <div class="addToPlaylist" @mouseover="handlePlaylistOver" @mouseleave="handlePlaylistLeave" :style="{ background: playlistHovered || playlistDetailHovered ? '#434343' : '' }">
      <div class="handlerText">Add To Playlist</div>
      <Icon type="moreInfo" :style="{ margin: 'auto 10px auto auto' }"></Icon>
    </div>
    <div class="addToQueue" v-show="currentPlaylistShow !== 'playlistQueue'" @mouseup="addMusciToPlaylistQueue">
      <div class="handlerText">Add To Queue</div>
    </div>
    <div class="exportMusic" @mouseup="handleExportMusic">
      <div class="handlerText">Export Music</div>
    </div>
    <div class="reveal" @mouseup="openFileInFile">
      <div class="handlerText">Reveal In Finder</div>
    </div>
    <div class="remove" @mouseup="handleRemove" :style="{ marginBottom: '5px' }">
      <div class="handlerText">Remove</div>
    </div>
    <div class="playlistDetail" v-show="playlistHovered || playlistDetailHovered" @mouseover="handlePlaylistDetailOver" @mouseleave="handlePlaylistDetailLeave">
      <div class="playlistContent" :style="{ overflowY: createdPlaylist.length > 5 ? 'scroll' : 'hidden' }">
        <div class="playlistContainer" v-for="(item, index) in createdPlaylist.map(i => i.name)"
          @mouseup="handleAddMusicToPlaylist(item)">
          <div class="content">{{ item }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import adb from 'adbkit';
import iconv from 'iconv-lite';
import { mapGetters } from 'vuex';
import path from 'path';
import Icon from '../BaseIconContainer';

export default {
  name: 'MusicHandler',
  data() {
    return {
      playlistHovered: false,
      playlistDetailHovered: false,
    };
  },
  props: {
    musicSrc: {
      type: String,
    },
    ifRightClick: {
      type: Boolean,
    },
  },
  components: {
    Icon,
  },
  computed: {
    ...mapGetters(['src', 'currentPlaylistShow', 'createdPlaylist']),
  },
  methods: {
    handleExportMusic() {
      const Promise = require('bluebird');
      const client = adb.createClient();
      client.listDevices()
        .then((devices) => { //eslint-disable-line
          if (!devices.length) {
            this.$store.dispatch('addNotifications', { content: '暂未找到可连接的设备', dismissAfter: 3000 });
          } else {
            return Promise.map(devices, (device) => { //eslint-disable-line
              if (device) {
                try {
                  return client.push(device.id, this.musicSrc, `/sdcard/Music/${iconv.encode(path.basename(this.musicSrc), 'utf8')}`)
                    .then((transfer) => { //eslint-disable-line
                      return new Promise((resolve, reject) => {
                        transfer.on('progress', (stats) => {
                          this.$store.dispatch('addNotifications', { content: '文件正在导出到Music中' });
                          console.log('so far', device.id, stats.bytesTransferred);
                        });
                        transfer.on('end', () => {
                          this.$store.dispatch('addNotifications', { content: '文件导出成功', dismissAfter: 3000 });
                          this.$store.dispatch('removeExportNotification');
                          console.log('Push complete', device.id);
                          resolve();
                        });
                        transfer.on('error', () => {
                          this.$store.dispatch('addNotifications', { content: '文件导出失败', dismissAfter: 3000 });
                          this.$store.dispatch('removeExportNotification');
                          reject();
                        });
                      });
                    });
                } catch (e) {
                  throw e;
                }
              }
            });
          }
        })
        .then(() => {
          console.log('Done pushing  to all connected devices');
        })
        .catch((err) => {
          console.error('Something went wrong:', err.stack);
        });
      this.$emit('update:ifRightClick', false);
    },
    handleAddMusicToPlaylist(item) {
      this.$store.dispatch('addMusicToPlaylist', [{ name: item, src: this.musicSrc }]);
      this.$emit('update:ifRightClick', false);
    },
    handlePlaylistDetailOver() {
      this.playlistDetailHovered = true;
    },
    handlePlaylistDetailLeave() {
      this.playlistDetailHovered = false;
    },
    handlePlaylistOver() {
      this.playlistHovered = true;
    },
    handlePlaylistLeave() {
      this.playlistHovered = false;
    },
    handlePlayNow() {
      this.$store.dispatch('updateSrc', this.musicSrc);
      this.$store.dispatch('updateCurrentPlaylistPlay', this.currentPlaylistShow);
      this.$store.dispatch('updatePaused', false);
      this.$emit('update:ifRightClick', false);
    },
    addMusciToPlaylistQueue() {
      this.$store.dispatch('updatePlaylistQueue', [this.musicSrc]);
      this.$emit('update:ifRightClick', false);
    },
    openFileInFile() {
      this.$electron.shell.showItemInFolder(path.dirname(this.musicSrc));
      this.$emit('update:ifRightClick', false);
    },
    handleRemove() {
      if (this.currentPlaylistShow === 'playlistQueue') {
        this.$store.dispatch('removeMusicFromQueue', this.musicSrc);
      } else if (this.currentPlaylistShow === 'musicLibrary') {
        this.$store.dispatch('removeMusicFromLibrary', this.musicSrc);
      }
      this.$store.dispatch('removeMusicFromPlaylist', { name: this.currentPlaylistShow, src: this.musicSrc });
      this.$emit('update:ifRightClick', false);
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
.handlerContainer {
  position: absolute;
  width: 180px;
  height: auto;
  background: #707070;
  border-radius: 5px;
  border: 0.5px solid rgb(75, 75, 75);
  display: flex;
  flex-direction: column;
  z-index: 100;
  .playNow, .addToQueue, .addToPlaylist, .remove, .reveal, .exportMusic {
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
  .playlistDetail {
    position: absolute;
    width: auto;
    height: auto;
    left: 180px;
    top: 35px;
    background: #707070;
    border-radius: 5px;
    border: 0.3px solid rgb(75, 75, 75);
    display: flex;
    flex-direction: column;
    max-height: 160px;
    .playlistContent {
      max-height: 150px;
      height: auto;
      margin: 5px 0 5px 0;
    }
    .playlistContainer {
      width: auto;
      height: 30px;
      display: flex;
      &:hover {
        background: #434343;
      }
      .content {
        color: rgba(255, 255, 255, 1);
        margin: auto 30px auto 20px;
        font-size: 13px;
      }
    }
  }
}
</style>
