<template>
  <div class="rightSettings" ref="lyricDrop">
    <div class="infoShift">
      <div class="songInfo" @mouseup="changeToLyric" :style="{ background: isLyricShow ? '#4B4B4B' : '#707070' }">
        <div class="text">LYRIC SHOW</div></div>
      <div class="tagsEdit" @mouseup="changeToTags" :style="{ background: !isLyricShow ? '#4B4B4B' : '#707070' }">
        <div class="text">TAG EDIT</div></div>
    </div>
    <lyric-info v-show="isLyricShow" :lyric.sync="lyric" :lyricTexts.sync="lyricTexts"></lyric-info>
    <tag-edit v-show="!isLyricShow"></tag-edit>
  </div>
</template>

<script>
import fs from 'fs';
import path from 'path';
import lrcParser from 'lrc-parser';
import iconv from 'iconv-lite';
import chardet from 'chardet';
import { mapGetters } from 'vuex';
import LyricInfo from './LyricInfo';
import TagEdit from './TagEdit';

export default {
  name: 'rightSettings',
  data() {
    return {
      isLyricShow: true,
      lyric: {},
      lyricTexts: [],
    };
  },
  components: {
    'lyric-info': LyricInfo,
    'tag-edit': TagEdit,
  },
  computed: {
    ...mapGetters(['src']),
  },
  mounted() {
    this.$refs.lyricDrop.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    this.$refs.lyricDrop.addEventListener('dragleave', (e) => {
      e.preventDefault();
    });
    this.$refs.lyricDrop.addEventListener('drop', (e) => {
      e.preventDefault();
      const files = Array.prototype.map.call(e.dataTransfer.files, f => f.path);
      const lrcRegex = new RegExp('^\\.lrc$', 'i');
      if (lrcRegex.test(path.extname(files[0])) && this.src !== '') {
        fs.readFile(files[0], async (err, data) => {
          const encodingBuffer = await this.getFragmentBuffer(files[0]);
          const decodeData = iconv.decode(data, chardet.detect(encodingBuffer));
          const parsedData = lrcParser(decodeData);
          this.lyric = parsedData;
          this.lyricTexts = parsedData.scripts.map(lrc => lrc.text);
        });
      }
    });
  },
  methods: {
    changeToLyric() {
      this.isLyricShow = true;
    },
    changeToTags() {
      if (this.src) {
        this.isLyricShow = false;
      }
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
