<template>
  <div class="songs-image" :style="{
    overflowY: rowMaxShowNum === 4 && albumList.length > 12 || rowMaxShowNum === 3 && albumList.length > 9 ? 'scroll' : ''
  }">
    <div class="songs-container" v-for="(item, index) in albumList" :style="{
      marginRight: isMargin && (index + 1) % rowMaxShowNum !== 0 ? '20px' : '',
      width: rowMaxShowNum === 4 ? '150px' : '160px',
      height: rowMaxShowNum === 4 ? '150px' : '160px'
    }">
      <img :src='pictureImage(item.picture)' :style="{ width: '100%', height: '100%' }">
    </div>
    <div class="blank-space" v-for="(item, index) in blanks" :style="{
      width: rowMaxShowNum === 4 ? '150px' : '160px',
      height: rowMaxShowNum === 4 ? '150px' : '160px',
      marginRight: isMargin && (index + 1 + albumList.length) % rowMaxShowNum !== 0 ? '20px' : '',
    }"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import isEmpty from 'lodash/isEmpty';

export default {
  name: 'SongsImage',
  computed: {
    ...mapGetters(['audioInfoSortByAlbum', 'winWidth', 'disXLeft']),
    albumList() {
      const keys = Object.keys(this.audioInfoSortByAlbum);
      const tmp = [];
      keys.forEach((item) => {
        let pic = '';
        this.audioInfoSortByAlbum[item].forEach((i) => {
          if (i.picture && !isEmpty(i.picture[0].data)) {
            pic = i.picture[0].data;
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
    rowMaxShowNum() {
      if (850 - this.disXLeft >= 660) return 4;
      return 3;
    },
    isMargin() {
      return ((850 - this.disXLeft) - (this.rowMaxShowNum * 150)) / (this.rowMaxShowNum - 1) >= 20;
    },
    blanks() {
      return new Array(this.rowMaxShowNum - (this.albumList.length % this.rowMaxShowNum));
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
  },
};
</script>

<style scoped lang="scss">
.songs-image {
  width: 98.5%;
  height: 99%;
  background: #434343;
  display: flex;
  margin: auto;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: start;
  .songs-container {
    margin-bottom: 20px;
  }
  .blank-space {
    visibility: hidden;
  }
}
</style>
