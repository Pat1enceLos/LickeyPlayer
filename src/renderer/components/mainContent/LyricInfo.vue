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
    <div class="lyric" ref="lyricScroll">
      <div class="lyricTransScope">
        <div class="lyricContainer" v-for="(item, index) in lyric.scripts" :id="'item'+index"
          :style="{
            transform: `translateY(-${lyricScrollTop}px)`,
            transition: currentLyric.length && transFlag ? `transform ${currentLyric[0].end - currentLyric[0].start}s linear` : '',
          }">
          <div class="lyricContent"
            :style="{
              color: isCurrentCue(item) ? '#FFCF2E' : 'rgba(255, 255, 255)',
              transition: 'color 300ms linear',
            }" v-html="item.text"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import lrcParser from 'lrc-parser';
import toBuffer from 'typedarray-to-buffer';
import iconv from 'iconv-lite';
import fs from 'fs';
import { mapGetters } from 'vuex';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import chardet from 'chardet';

export default {
  name: 'LyricInfo',
  data() {
    return {
      currentLyric: [],
      lyricScrollTop: 0,
      transFlag: true,
      cueIndex: 0,
      lastCueIndex: 0,
    };
  },
  props: {
    lyric: {
      type: Object,
    },
    lyricTexts: {
      type: Array,
    },
  },
  computed: {
    ...mapGetters(['currentAudioInfo', 'src', 'currentTime', 'duration']),
    title() {
      return this.currentAudioInfo ? this.currentAudioInfo.title : 'No Music Info';
    },
    artist() {
      return this.currentAudioInfo ? this.currentAudioInfo.artists : 'No Artist Info';
    },
    picture() {
      return this.currentAudioInfo && this.currentAudioInfo.picture && !isEmpty(this.currentAudioInfo.picture[0].data) ? `data:image/jpeg;base64,${toBuffer(this.currentAudioInfo.picture[0].data).toString('base64')}` : '';
    },
  },
  mounted() {
    this.$bus.$on('seek', () => {
      this.transFlag = false;
      setTimeout(() => {
        this.transFlag = true;
      }, 10);
    });
  },
  methods: {
    isCurrentCue(item) {
      return isEqual(item, this.currentLyric[0]);
    },
  },
  watch: {
    lyric() {
      this.transFlag = false;
      setTimeout(() => {
        this.transFlag = true;
      }, 10);
    },
    src(val) {
      this.searchForLocalList(val).then((src) => {
        if (src.length) {
          fs.readFile(src[0], async (err, data) => {
            const encodingBuffer = await this.getFragmentBuffer(src[0]);
            const decodeData = iconv.decode(data, chardet.detect(encodingBuffer));
            const parsedData = lrcParser(decodeData);
            this.$emit('update:lyric', parsedData);
            this.$emit('update:lyricTexts', parsedData.scripts.map(lrc => lrc.text));
          });
        } else {
          this.$emit('update:lyric', {});
          this.$emit('update:lyricTexts', []);
        }
      });
    },
    currentTime(val) {
      if (!isEmpty(this.lyric)) {
        const cues = this.lyric.scripts
          .filter(lyric => lyric.start <= val && lyric.end >= val && lyric.text !== '');
        if (!isEqual(cues, this.currentLyric)) {
          this.currentLyric = cues;
        }
      }
    },
    currentLyric(val) {
      this.lyric.scripts.forEach((item, index) => {
        if (isEqual(item, val[0])) {
          this.cueIndex = index;
        }
      });
      if (this.cueIndex > 3 && this.cueIndex <= this.lyricTexts.length - 7) {
        this.lyricScrollTop = 25 * (this.cueIndex - 3);
      } else if (this.cueIndex <= 3) {
        this.lyricScrollTop = 0;
      } else if (this.cueIndex > this.lyricTexts.length - 7) {
        this.lyricScrollTop = 25 * (this.lyricTexts.length - 10);
      }
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
    margin: 15px auto 0 auto;
    background: black;
  }
  .songTitle {
    width: 180px;
    height: auto;
    margin: 10px auto 0 auto;
    font-size: 15px;
    text-align: center;
    color: rgba(255, 255, 255, 1);
  }
  .songAuthor {
    width: auto;
    height: auto;
    margin: 6px auto 0 auto;
    font-size: 12px;
    color: rgba(255, 255, 255, 1);
  }
  .lyric {
    width: 200px;
    height: 250px;
    margin: 10px auto auto auto;
    overflow: hidden;
    transition: scrollTop 200ms linear;
    .lyricTransScope {
      width: 100%;
      height: 100%;
    }
    .lyricContainer {
      text-align: center;
      font-size: 12px;
      line-height: 25px;
    }
  }
}
</style>
