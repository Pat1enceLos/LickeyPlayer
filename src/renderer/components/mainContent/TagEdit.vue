<template>
  <div class="tagEdit" ref="tagsEdit">
    <div class="logoEdit">
      <img :src='picture' :style="{ width: '100%', height: '100%' }" v-show="picture">
    </div>
    <div class="titleEdit">
      <div class="titleTags">Title</div>
      <input class="titleEditInput" v-model="title" @input="handleTitleInput"/>
      <Icon v-show="titleTags" type="save" :style="{ position: 'absolute', transform: 'translate(780%, 125%)', cursor: 'pointer' }" @mouseup.native="saveTitle"></Icon>
    </div>
    <div class="artistEdit">
      <div class="artistTags">Artist</div>
      <input class="artistEditInput" v-model="artist" @input="handleArtistInput"/>
      <Icon v-show="artistTags" type="save" :style="{ position: 'absolute', transform: 'translate(780%, 125%)', cursor: 'pointer' }" @mouseup.native="saveArtist"></Icon>
    </div>
    <div class="albumEdit">
      <div class="albumTags">Album</div>
      <input class="albumEditInput" v-model="album" @input="handleAlbumInput"/>
      <Icon v-show="albumTags" type="save" :style="{ position: 'absolute', transform: 'translate(780%, 125%)', cursor: 'pointer' }" @mouseup.native="saveAlbum"></Icon>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Icon from '../BaseIconContainer';

export default {
  name: 'TagEdit',
  data() {
    return {
      titleTags: false,
      artistTags: false,
      albumTags: false,
      title: '暂无歌曲信息',
      artist: '暂无歌手信息',
      album: '暂无专辑信息',
      inputClassList: ['titleEditInput', 'artistEditInput', 'albumEditInput'],
    };
  },
  components: {
    Icon,
  },
  computed: {
    ...mapGetters(['currentAudioInfo', 'src']),
    picture() {
      return this.currentAudioInfo && this.currentAudioInfo.picture ? `data:image/jpeg;base64,${this.currentAudioInfo.picture[0].data.toString('base64')}` : '';
    },
  },
  watch: {
    src() {
      this.title = this.currentAudioInfo.title;
      this.artist = this.currentAudioInfo.artists;
      this.album = this.currentAudioInfo.album;
    },
  },
  mounted() {
    // this.$refs.tagsEdit.addEventListener('mousedown', (e) => {
    //   if (['svg', 'use'].includes(e.target.nodeName)) {
    //     e.preventDefault();
    //   } else {
    //     if (e.target.className !== 'titleEditInput') {
    //       this.title = this.currentAudioInfo ? this.currentAudioInfo.title : '暂无歌曲信息';
    //       this.titleTags = false;
    //     }
    //     if (e.target.className !== 'artistEditInput') {
    //       this.artist = this.currentAudioInfo ? this.currentAudioInfo.artists : '暂无歌手信息';
    //       this.artistTags = false;
    //     }
    //     if (e.target.className !== 'albumEditInput') {
    //       this.album = this.currentAudioInfo ? this.currentAudioInfo.album : '暂无专辑信息';
    //       this.albumTags = false;
    //     }
    //   }
    // });
  },
  methods: {
    // handleTitleBlur() {
    //   this.title = this.currentAudioInfo.title;
    //   this.titleTags = false;
    // },
    // handleArtistBlur() {
    //   this.artist = this.currentAudioInfo.artists;
    //   this.artistTags = false;
    // },
    // handleAlbumBlur() {
    //   this.album = this.currentAudioInfo.album;
    //   this.albumTags = false;
    // },
    saveTitle() {
      const newVal = document.querySelector('.titleEditInput').value;
      const newCurrentAudioInfo = Object.assign({}, this.currentAudioInfo);
      newCurrentAudioInfo.title = newVal;
      this.$store.dispatch('updateCurrentAudioInfo', newCurrentAudioInfo);
      this.titleTags = false;
    },
    saveArtist() {
      const newVal = document.querySelector('.artistEditInput').value;
      const newCurrentAudioInfo = Object.assign({}, this.currentAudioInfo);
      newCurrentAudioInfo.artists[0] = newVal;
      this.$store.dispatch('updateCurrentAudioInfo', newCurrentAudioInfo);
      this.artistTags = false;
    },
    saveAlbum() {
      const newVal = document.querySelector('.albumEditInput').value;
      const newCurrentAudioInfo = Object.assign({}, this.currentAudioInfo);
      newCurrentAudioInfo.album = newVal;
      this.$store.dispatch('updateCurrentAudioInfo', newCurrentAudioInfo);
      this.albumTags = false;
    },
    handleTitleInput() {
      this.titleTags = document.querySelector('.titleEditInput').value !== this.currentAudioInfo.title;
    },
    handleArtistInput() {
      this.artistTags = document.querySelector('.artistEditInput').value !== this.currentAudioInfo.artists[0];
    },
    handleAlbumInput() {
      this.albumTags = document.querySelector('.albumEditInput').value !== this.currentAudioInfo.album;
    },
  },
};
</script>

<style scoped lang="scss">
.tagEdit {
  width: 100%;
  height: 525px;
  display: flex;
  flex-direction: column;
  .logoEdit {
    width: 180px;
    height: 180px;
    margin: 15px auto 0 auto;
    background: black;
  }
  .titleEdit {
    width: 180px;
    height: auto;
    display: flex;
    flex-direction: column;
    margin: 20px auto 0 auto;
    border-bottom: 0.1px solid rgba(255, 255, 255, 1);
    .titleTags {
      font-size: 13px;
      color: rgba(255, 255, 255, 1);
      margin-bottom: 5px;
    }
    .titleEditInput {
      height: 24px;
      width: 83%;
      background: transparent;
      outline: none;
      font-size: 13px;
      text-indent: 4px;
      border-radius: 3px;
      border: none;
    }
  }
  .artistEdit {
    width: 180px;
    height: auto;
    display: flex;
    flex-direction: column;
    margin: 5px auto 0 auto;
    border-bottom: 0.1px solid rgba(255, 255, 255, 1);
    .artistTags {
      font-size: 13px;
      color: rgba(255, 255, 255, 1);
      margin-bottom: 5px;
    }
    .artistEditInput {
      height: 24px;
      width: 83%;
      background: transparent;
      outline: none;
      font-size: 13px;
      text-indent: 4px;
      border-radius: 3px;
      border: none;
    }
  }
  .albumEdit {
    width: 180px;
    height: auto;
    display: flex;
    flex-direction: column;
    margin: 5px auto 0 auto;
    border-bottom: 0.1px solid rgba(255, 255, 255, 1);
    .albumTags {
      font-size: 13px;
      color: rgba(255, 255, 255, 1);
      margin-bottom: 5px;
    }
    .albumEditInput {
      height: 24px;
      width: 83%;
      background: transparent;
      outline: none;
      font-size: 13px;
      text-indent: 4px;
      border-radius: 3px;
      border: none;
    }
  }
}
</style>
