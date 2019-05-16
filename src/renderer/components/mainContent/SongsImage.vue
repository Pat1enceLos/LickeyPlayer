<template>
  <div class="songs-image" :style="{
    overflowY: isOverflow ? 'scroll' : ''
  }">
    <div class="songs-container" v-for="(item, index) in firstAlbumList"
      @mouseup="handleshowAlbumPlaylist(item, index)"
      :style="{
        marginRight: isMargin && (index + 1) % rowMaxShowNum !== 0 ? '20px' : '',
        width: `${imageWidth}px`,
        height: `${imageHeight}px`,
        order: '0',
    }">
      <div class="img-container">
        <img :src='pictureImage(item.picture)' class="album-image" :style="{
         border: showAlbumPlaylist === item.name ? '1px solid #FFCF2E' : '',
        }">
      </div>
      <div class="album-info">
        <p class="album-name">{{ item.name }}</p>
        <p class="album-artist">{{ item.playlist[0].artists }}</p>
      </div>
    </div>
    <songs-table v-show="showAlbumPlaylist && albumList.find(i => i.name === showAlbumPlaylist)" :style="{ order: '2' }" :albumPlaylist="selectedAlbumPlaylist"></songs-table>
    <div class="songs-container" v-for="(item, index) in secondAlbumList"
      @mouseup="handleSecondshowAlbumPlaylist(item, index)"
      :style="{
        marginRight: isMargin && (index + 1) % rowMaxShowNum !== 0 ? '20px' : '',
        width: `${imageWidth}px`,
        height: `${imageHeight}px`,
        border: showAlbumPlaylist === item.name ? '1px solid #FFCF2E' : '',
        order: '3',
    }">
      <div class="img-container">
        <img :src='pictureImage(item.picture)' class="album-image" :style="{
         border: showAlbumPlaylist === item.name ? '1px solid #FFCF2E' : '',
        }">
      </div>
      <div class="album-info">
        <p class="album-name">{{ item.name }}</p>
        <p class="album-artist">{{ item.playlist[0].artists }}</p>
      </div>
    </div>
    <div class="blank-space" v-for="(item, index) in blanks" :style="{
      width: `${imageWidth}px`,
      height: `${imageHeight}px`,
      marginRight: isMargin && (index + 1 + albumList.length) % rowMaxShowNum !== 0 ? '20px' : '',
      order: isLastRow ? '1' : '4',
    }"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import toBuffer from 'typedarray-to-buffer';
import _ from 'lodash';
import isEmpty from 'lodash/isEmpty';
import songsTable from './SongsTable.vue';

export default {
  name: 'SongsImage',
  data() {
    return {
      showAlbumPlaylist: '',
      showAlbumIndex: -1,
      isSearch: false,
    };
  },
  components: {
    'songs-table': songsTable,
  },
  mounted() {
    this.$bus.$on('search-tips', (key) => {
      this.isSearch = key !== '';
    });
  },
  computed: {
    ...mapGetters(['winWidth', 'disXLeft', 'playlistQueue', 'musicLibraryPlaylist', 'currentPlaylistShow', 'createdPlaylist',
      'fullTitleSearcher', 'fullArtistSearcher', 'fullAlbumSearcher', 'audioInfo']),
    displayPlaylist() {
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
    isOverflow() {
      const imageLine = (this.albumList.length + this.blanks.length) / this.rowMaxShowNum;
      const allHeight = this.selectedAlbumPlaylist.length === 0 ?
        (imageLine * this.imageHeight) + ((imageLine - 1) * 20) :
        (imageLine * this.imageHeight) + ((imageLine - 1) * 20) +
        (this.selectedAlbumPlaylist.length * 35) + 60;
      console.log(allHeight);
      return allHeight > 560 * 0.99;
    },
    selectedAlbumPlaylist() {
      const selectedAlbum = this.albumList.filter(i => i.name === this.showAlbumPlaylist);
      return selectedAlbum.length ? selectedAlbum[0].playlist.map(i => i.src) : [];
    },
    audioInfoSortByAlbum() {
      const currentPlaylistAlbum = this.audioInfo.filter(i => this.displayPlaylist.includes(i.src));
      console.log(currentPlaylistAlbum);
      return _.groupBy(currentPlaylistAlbum, 'album');
    },
    albumList() {
      console.log(this.displayPlaylist);
      const keys = Object.keys(this.audioInfoSortByAlbum);
      const tmp = [];
      keys.forEach((item) => {
        let pic = '';
        this.audioInfoSortByAlbum[item].forEach((i) => {
          if (i.picture && !isEmpty(i.picture[0].data)) {
            pic = toBuffer(i.picture[0].data);
          }
        });
        tmp.push({
          name: item,
          picture: pic,
          playlist: this.audioInfoSortByAlbum[item],
        });
      });
      return tmp;
    },
    firstNum() {
      const rest = (this.showAlbumIndex + 1) % this.rowMaxShowNum === 0 ?
        0 : (this.rowMaxShowNum - ((this.showAlbumIndex + 1) % this.rowMaxShowNum));
      return this.showAlbumIndex + 1 > this.rowMaxShowNum ?
        rest + this.showAlbumIndex + 1 : this.rowMaxShowNum;
    },
    isLastRow() {
      return this.showAlbumIndex + 1 + 3 >= this.albumList.length + this.blanks.length;
    },
    firstAlbumList() {
      if (this.showAlbumPlaylist) {
        return this.albumList.slice(0, this.firstNum);
      }
      return this.albumList;
    },
    secondAlbumList() {
      if (this.showAlbumPlaylist) {
        return this.albumList.length > this.firstNum ?
          this.albumList.slice(this.firstNum, this.albumList.length) : [];
      }
      return [];
    },
    rowMaxShowNum() {
      if (850 - this.disXLeft >= 660) return 4;
      return 3;
    },
    imageWidth() {
      return this.rowMaxShowNum === 3 ? '150' : '140';
    },
    imageHeight() {
      return this.rowMaxShowNum === 3 ? '180' : '170';
    },
    isMargin() {
      return ((850 - this.disXLeft) - (this.rowMaxShowNum * this.imageWidth)) /
        (this.rowMaxShowNum - 1) >= 40;
    },
    blanks() {
      if (this.albumList.length) {
        return this.albumList.length % this.rowMaxShowNum === 0 ?
          [] : new Array(this.rowMaxShowNum - (this.albumList.length % this.rowMaxShowNum));
      }
      return [];
    },
  },
  watch: {
    rowMaxShowNum(val) {
      console.log(val);
    },
  },
  methods: {
    pictureImage(data) {
      return data ? `data:image/jpeg;base64,${data.toString('base64')}` : '';
    },
    handleshowAlbumPlaylist(item, index) {
      if (this.showAlbumPlaylist === item.name) {
        this.showAlbumPlaylist = '';
        this.showAlbumIndex = -1;
      } else {
        this.showAlbumPlaylist = item.name;
        this.showAlbumIndex = index;
      }
    },
    handleSecondshowAlbumPlaylist(item, index) {
      this.showAlbumPlaylist = item.name;
      this.showAlbumIndex = this.firstAlbumList.length + index;
    },
  },
};
</script>

<style scoped lang="scss">
.songs-image {
  width: 100%;
  height: 100%;
  background: #434343;
  display: flex;
  margin: auto;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: start;
  .album-playlist-details {
    width: 100%;
    height: auto;
  }
  .songs-container {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    .img-container {
      width: 100%;
      height: calc(100% - 30px);
      display: flex;
      .album-image {
        width: calc(100% - 2px);
        height: calc(100% - 2px);
        margin: auto;
      }
    }
    .album-info {
      width: 100%;
      height: 30px;
      display: flex;
      flex-direction: column;
      color: rgba(255, 255, 255, 1);
      white-space: nowrap;
      .album-name {
        width: 100%;
        font-size: 10px;
        line-height: 18px;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .album-artist {
        width: 100%;
        font-size: 8px;
        line-height: 12px;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
  .blank-space {
    visibility: hidden;
  }
}
</style>
