<template>
  <div class="lyricInfo">
    <div class="lyricLogo">
      <img :src='picture' :style="{ width: '100%', height: '100%' }" v-show="picture">
    </div>
    <div class="songTitle">
      {{ title }}
    </div>
    <div class="songAuthor">
      {{ artist }}
    </div>
    <div class="lyric">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'LyricInfo',
  computed: {
    ...mapGetters(['currentAudioInfo', 'src']),
    title() {
      return this.currentAudioInfo ? this.currentAudioInfo.title : '暂无歌曲信息';
    },
    artist() {
      return this.currentAudioInfo ? this.currentAudioInfo.artists[0] : '暂无歌手信息';
    },
    picture() {
      return this.currentAudioInfo ? `data:image/jpeg;base64,${this.currentAudioInfo.picture[0].data.toString('base64')}` : '';
    },
  },
};
</script>

<style scoped lang="scss">
.lyricInfo {
  width: 100%;
  height: 525px;
  display: flex;
  flex-direction: column;
  .lyricLogo {
    width: 180px;
    height: 180px;
    margin: 20px auto 0 auto;
    background: black;
  }
  .songTitle {
    width: auto;
    height: auto;
    margin: 10px auto 0 auto;
    font-size: 15px;
  }
  .songAuthor {
    width: auto;
    height: auto;
    margin: 6px auto 0 auto;
    font-size: 12px;
  }
  .lyric {
    width: 180px;
    height: 250px;
    margin: 10px auto auto auto;
  }
}
</style>
