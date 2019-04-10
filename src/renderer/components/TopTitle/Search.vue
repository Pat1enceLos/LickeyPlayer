<template>
  <div class="searchInput">
    <input ref="inputSearch" class="input" @input="handleSearch">
    <Icon type="search"></Icon>
    <div class="searchTips" v-show="(fullTitleSearcher.length || fullArtistSearcher.length || fullAlbumSearcher.length) && !tipsBlur">
      <div class="tipsMargin">
        <div class="titleTips">
          <div class="titleTags" v-show="fullTitleSearcher.length">
            <span>{{ '歌曲' }}</span>
          </div>
          <div class="titleContainer" v-for="(item, index) in fullTitleSearcher">
            <span>{{ item.name }}</span>
          </div>
        </div>
        <div class="artistTips">
          <div class="artistTags" v-show="fullArtistSearcher.length">
            <span>{{ '歌手' }}</span>
          </div>
          <div class="artistContainer" v-for="(item, index) in fullArtistSearcher">
            <span>{{ item.name }}</span>
          </div>
        </div>
        <div class="albumTips">
          <div class="albumTags" v-show="fullAlbumSearcher.length">
            <span>{{ '专辑' }}</span>
          </div>
          <div class="albumContainer" v-for="(item, index) in fullAlbumSearcher">
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Icon from '../BaseIconContainer';

export default {
  name: 'Search',
  components: {
    Icon,
  },
  data() {
    return {
      tipsBlur: false,
      blurClass: ['searchTips', 'tipsMargin', 'titleTips', 'titleTags', 'titleContainer', 'artistTips', 'artistTags', 'artistContainer', 'albumTips', 'albumTags', 'albumContainer'],
    };
  },
  mounted() {
    window.addEventListener('mousedown', (e) => {
      if (!this.blurClass.includes(e.target.className) && e.target.nodeName !== 'SPAN') {
        this.tipsBlur = true;
      }
    });
  },
  computed: {
    ...mapGetters(['audioInfo', 'fullTitleSearcher', 'fullArtistSearcher', 'fullAlbumSearcher']),
  },
  watch: {
    fullTitleSearcher(val) {
      console.log(val);
    },
    fullArtistSearcher(val) {
      console.log(val);
    },
    fullAlbumSearcher(val) {
      console.log(val);
    },
  },
  methods: {
    handleSearch() {
      this.tipsBlur = false;
      const mainKey = this.$refs.inputSearch.value;
      this.searchTitle(mainKey);
      this.searchArtist(mainKey);
      this.searchAlbum(mainKey);
    },
    searchTitle(key) {
      const similarMatch = [];
      this.audioInfo.forEach((item) => {
        if (item.title.includes(key) && key) {
          similarMatch.push({
            name: item.title,
            rank: (1000 - (item.title.indexOf(key) * 50)) + (key.length / 10),
          });
        }
      });
      this.$store.dispatch('updateFullTitleSearch', similarMatch.sort((a, b) => b.rank - a.rank));
    },
    searchArtist(key) {
      const similarMatch = [];
      this.audioInfo.forEach((item) => {
        if (item.artists.includes(key) && key) {
          similarMatch.push({
            name: item.artists,
            rank: (1000 - (item.artists.indexOf(key) * 50)) + (key.length / 10),
          });
        }
      });
      this.$store.dispatch('updateFullArtistSearch', similarMatch.sort((a, b) => b.rank - a.rank));
    },
    searchAlbum(key) {
      const similarMatch = [];
      this.audioInfo.forEach((item) => {
        if (item.album.includes(key) && key) {
          similarMatch.push({
            name: item.album,
            rank: (1000 - (item.album.indexOf(key) * 50)) + (key.length / 10),
          });
        }
      });
      this.$store.dispatch('updateFullAlbumSearch', similarMatch.sort((a, b) => b.rank - a.rank));
    },
  },
};
</script>

<style scoped lang="scss">
  .searchInput {
    width: 580px;
    display: flex;
    .input {
      width: 200px;
      height: 25px;
      margin: auto auto 10px 50px;
      border:1px solid #c8cccf;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.8);
      text-indent: 28px;
      outline: none;
      font-size: 12px;
    }
    .searchTips {
      width: auto;
      height: auto;
      display: flex;
      position: absolute;
      background: #707070;
      top: 90px;
      left: 300px;
      border-radius: 3px;
      .tipsMargin {
        margin: 5px auto 5px auto;
        width: auto;
        height: auto;
        display: flex;
        flex-direction: column;
        .titleTips, .artistTips, .albumTips {
          width: auto;
          height: auto;
          display: flex;
          flex-direction: column;
          .titleTags, .artistTags, .albumTags {
            width: auto;
            height: 20px;
            display: flex;
            background: #434343;
            span {
              width: auto;
              margin: auto 50px auto 13px;
              font-size: 13px;
              color: rgba(255, 255, 255, 1);
            }
          }
          .titleContainer, .artistContainer, .albumContainer {
            width: auto;
            height: 18px;
            display: flex;
            span {
              font-size: 10px;
              margin: auto 50px auto 10px;
              color: rgba(255, 255, 255, 1);
            }
            &:hover {
              background: #505050;
            }
          }
        }
      }
    }
  }
</style>
