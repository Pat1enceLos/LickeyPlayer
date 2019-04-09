<template>
  <div class="searchInput">
    <input ref="inputSearch" class="input" @input="handleSearch">
    <Icon type="search"></Icon>
    <div class="searchTips" v-show="fullTitleSearcher.length || fullArtistSearcher.length || fullAlbumSearcher.length">
      <div class="tipsMargin">
        <div class="titleTips">
          <div class="titleTags" v-show="fullTitleSearcher.length">
            <p>{{ '歌曲' }}</p>
          </div>
          <div class="titleContainer" v-for="(item, index) in fullTitleSearcher">
            <p>{{ item.name }}</p>
          </div>
        </div>
        <div class="artistTips">
          <div class="artistTags" v-show="fullArtistSearcher.length">
            <p>{{ '歌手' }}</p>
          </div>
          <div class="artistContainer" v-for="(item, index) in fullArtistSearcher">
            <p>{{ item.name }}</p>
          </div>
        </div>
        <div class="albumTips">
          <div class="albumTags" v-show="fullAlbumSearcher.length">
            <p>{{ '专辑' }}</p>
          </div>
          <div class="albumContainer" v-for="(item, index) in fullAlbumSearcher">
            <p>{{ item.name }}</p>
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
    };
  },
  mounted() {
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
            p {
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
            p {
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
