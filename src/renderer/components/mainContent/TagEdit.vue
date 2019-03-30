<template>
  <div class="tagEdit">
    <div class="logoEdit">
      <img :src='picture' :style="{ width: '100%', height: '100%' }" v-show="picture">
    </div>
    <div class="titleEdit">
      <div class="titleTags">Title</div>
      <input class="titleEditInput" @input="handleTitleInput"/>
      <Icon type="save" :style="{ position: 'absolute', transform: 'translate(780%, 125%)', display: titleTags ? 'inline-block' : 'none' }"></Icon>
    </div>
    <div class="artistEdit">
      <div class="artistTags">Artist</div>
      <input class="artistEditInput" @input="handleArtistInput"/>
      <Icon type="save" :style="{ position: 'absolute', transform: 'translate(780%, 125%)' }" v-show="artistTags"></Icon>
    </div>
    <div class="albumEdit">
      <div class="albumTags">Album</div>
      <input class="albumEditInput" @input="handleAlbumInput"/>
      <Icon type="save" :style="{ position: 'absolute', transform: 'translate(780%, 125%)' }" v-show="albumTags"></Icon>
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
      document.querySelector('.titleEditInput').setAttribute('value', this.currentAudioInfo ? this.currentAudioInfo.title : '暂无歌曲信息');
      document.querySelector('.artistEditInput').setAttribute('value', this.currentAudioInfo ? this.currentAudioInfo.artists[0] : '暂无歌手信息');
      document.querySelector('.albumEditInput').setAttribute('value', this.currentAudioInfo ? this.currentAudioInfo.album : '');
    },
  },
  methods: {
    handleTitleInput() {
      this.titleTags = document.querySelector('.titleEditInput').value !== this.title;
    },
    handleArtistInput() {
      this.artistTags = document.querySelector('.artistEditInput').value !== this.artist;
    },
    handleAlbumInput() {
      this.albumTags = document.querySelector('.albumEditInput').value !== this.album;
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
    .titleTags {
      font-size: 13px;
      color: rgba(255, 255, 255, 1);
      margin-bottom: 5px;
    }
    .titleEditInput {
      height: 24px;
      width: 100%;
      background: rgb(75, 75, 75);
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
    .artistTags {
      font-size: 13px;
      color: rgba(255, 255, 255, 1);
      margin-bottom: 5px;
    }
    .artistEditInput {
      height: 24px;
      width: 100%;
      background: rgb(75, 75, 75);
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
    .albumTags {
      font-size: 13px;
      color: rgba(255, 255, 255, 1);
      margin-bottom: 5px;
    }
    .albumEditInput {
      height: 24px;
      width: 100%;
      background: rgb(75, 75, 75);
      outline: none;
      font-size: 13px;
      text-indent: 4px;
      border-radius: 3px;
      border: none;
    }
  }
}
</style>
