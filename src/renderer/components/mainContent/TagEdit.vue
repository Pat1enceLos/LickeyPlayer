<template>
  <div class="tagEdit">
    <div class="logoEdit">
      <img :src='picture' :style="{ width: '100%', height: '100%' }" v-show="picture">
    </div>
    <div class="titleEdit">
      <div class="titleTags">Title</div>
      <input class="titleEditInput" :value="title"/>
    </div>
    <div class="artistEdit">
      <div class="artistTags">Artist</div>
      <input class="artistEditInput" :value="artist"/>
    </div>
    <div class="albumEdit">
      <div class="albumTags">Album</div>
      <input class="albumEditInput" :value="album"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TagEdit',
  computed: {
    ...mapGetters(['currentAudioInfo', 'src']),
    picture() {
      return this.currentAudioInfo && this.currentAudioInfo.picture ? `data:image/jpeg;base64,${this.currentAudioInfo.picture[0].data.toString('base64')}` : '';
    },
    title() {
      return this.currentAudioInfo ? this.currentAudioInfo.title : '暂无歌曲信息';
    },
    artist() {
      return this.currentAudioInfo ? this.currentAudioInfo.artists[0] : '暂无歌手信息';
    },
    album() {
      return this.currentAudioInfo ? this.currentAudioInfo.album : '';
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
      background: rgba(255, 255, 255, 1);
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
      background: rgba(255, 255, 255, 1);
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
      background: rgba(255, 255, 255, 1);
      outline: none;
      font-size: 13px;
      text-indent: 4px;
      border-radius: 3px;
      border: none;
    }
  }
}
</style>
