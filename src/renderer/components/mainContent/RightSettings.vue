<template>
  <div class="rightSettings">
    <div class="infoShift">
      <div class="songInfo" @mouseup="changeToLyric" :style="{ background: isLyricShow ? '#4B4B4B' : '#707070' }">
        <div class="text">LYRIC SHOW</div></div>
      <div class="tagsEdit" @mouseup="changeToTags" :style="{ background: !isLyricShow ? '#4B4B4B' : '#707070' }">
        <div class="text">TAG EDIT</div></div>
    </div>
    <lyric-info v-show="isLyricShow"></lyric-info>
    <tag-edit v-show="!isLyricShow"></tag-edit>
  </div>
</template>

<script>
import LyricInfo from './LyricInfo';
import TagEdit from './TagEdit';

export default {
  name: 'rightSettings',
  data() {
    return {
      isLyricShow: true,
    };
  },
  components: {
    'lyric-info': LyricInfo,
    'tag-edit': TagEdit,
  },
  methods: {
    changeToLyric() {
      this.isLyricShow = true;
    },
    changeToTags() {
      this.isLyricShow = false;
    },
  },
};
</script>

<style scoped lang="scss">
  .rightSettings {
    width: 230px;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    .infoShift {
      width: 100%;
      height: 35px;
      display: flex;
      flex-direction: row;
      .text {
        color: rgba(255, 255, 255, 1);
        font-size: 13px;
        margin: auto;
      }
      .songInfo {
        width: 50%;
        height: 100%;
        display: flex;
      }
      .tagsEdit {
        width: 50%;
        height: 100%;
        display: flex;
      }
    }
  }
</style>
