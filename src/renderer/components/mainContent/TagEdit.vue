<template>
  <div class="tagEdit" ref="tagsEdit">
    <div class="logoEdit">
      <img :src='picture' :style="{ width: '100%', height: '100%' }" v-show="picture">
    </div>
    <div class="editContainer">
      <div class="moreTagsInfo" v-show="addTags" @blur="handleBlur" tabindex="1">
        <div class="tagsMargin">
          <div class="tagsContainer" v-for="(item) in Object.values(tags)" @mouseup="changeOneTag(item)">
            <div :style="{ width: '10px', height: '10px', margin: 'auto 0 auto 10px' }">
              <Icon v-show="selectedToShow(item)" type="tagsSelected"></Icon>
            </div>
            <p>{{ item }}</p>
          </div>
        </div>
      </div>
      <div class="iconContainer">
        <Icon type="edit"></Icon>
        <Icon type="addTags" @mouseup.native="addMoreTags"></Icon>
      </div>
      <div class="tagsScroll">
        <div class="edit" v-for="(item, index) in enabledEditType">
          <div class="tagsType">{{ item }}</div>
          <input class="typeEditInput" :class="`${item}EditInput`" v-model="types[item]" @input="handleTypeInput(item, index)"/>
          <Icon v-show="modifyToShow[index][item]" type="save" :style="{ position: 'absolute', transform: 'translate(780%, 125%)', cursor: 'pointer' }" @mouseup.native="saveEdit(item, index)"></Icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';
import Icon from '../BaseIconContainer';

export default {
  name: 'TagEdit',
  data() {
    return {
      types: {},
      inputClassList: ['titleEditInput', 'artistEditInput', 'albumEditInput'],
      modifyToShow: [
        { title: false },
        { artists: false },
        { album: false },
        { trackNo: false },
        { totalTracks: false },
        { discNo: false },
        { totalDisk: false },
        { year: false },
        { BMP: false },
        { genre: false },
        { albumArtist: false },
        { composer: false },
        { performer: false },
        { publisher: false },
        { description: false },
        { comment: false },
        { rating: false },
        { duration: false },
        { sampleRate: false },
        { channels: false },
        { bits: false },
        { bitrate: false },
        { codec: false },
        { encoding: false },
      ],
      tags: {
        title: 'Title',
        artists: 'Artist',
        album: 'Album',
        trackNo: 'Track No.',
        totalTracks: 'Total Tracks',
        discNo: 'Disc No.',
        totalDisk: 'Total Discs',
        year: 'Year',
        BMP: 'BPM',
        genre: 'Genre',
        albumArtist: 'Album Artist',
        composer: 'Composer',
        performer: 'Performer',
        publisher: 'Publisher',
        description: 'Description',
        comment: 'Comment',
        rating: 'Rating',
        duration: 'Duration',
        sampleRate: 'Sample Rate',
        channels: 'Channels',
        bits: 'Bits / Sample',
        bitrate: 'Bitrate',
        codec: 'Codec',
        encoding: 'Encoding',
      },
      addTags: false,
      mousedownTags: [],
    };
  },
  components: {
    Icon,
  },
  computed: {
    ...mapGetters(['currentAudioInfo', 'src', 'enabledEditType']),
    picture() {
      return this.currentAudioInfo && this.currentAudioInfo.picture ? `data:image/jpeg;base64,${this.currentAudioInfo.picture[0].data.toString('base64')}` : '';
    },
  },
  watch: {
    src() {
      this.enabledEditType.forEach((item, index) => {
        const info = ['暂无歌曲信息', '暂无歌手信息', '暂无专辑信息'];
        const defaultInfo = index < 3 ? info[index] : '';
        this.types[item] = this.currentAudioInfo ? this.currentAudioInfo[item] : defaultInfo;
      });
    },
    currentAudioInfo() {
      this.enabledEditType.forEach((item) => {
        this.types[item] = this.currentAudioInfo[item];
      });
    },
  },
  mounted() {
  },
  methods: {
    selectedToShow(item) {
      return this.enabledEditType.includes(_.findKey(this.tags, i => i === item));
    },
    saveEdit(item, index) {
      const newVal = document.querySelector(`.${item}EditInput`).value;
      const newCurrentAudioInfo = Object.assign({}, this.currentAudioInfo);
      newCurrentAudioInfo[item] = newVal;
      this.$store.dispatch('updateCurrentAudioInfo', newCurrentAudioInfo);
      this.modifyToShow[index][item] = false;
    },
    handleTypeInput(item, index) {
      this.modifyToShow[index][item] = document.querySelector(`.${item}EditInput`).value !== this.currentAudioInfo[item];
    },
    addMoreTags() {
      this.addTags = true;
      setTimeout(() => {
        document.querySelector('.moreTagsInfo').focus();
      }, 0);
    },
    handleBlur() {
      this.addTags = false;
    },
    changeOneTag(item) {
      const tmpArr = [].concat(this.enabledEditType);
      if (this.selectedToShow(item)) {
        this.enabledEditType.forEach((i, index) => {
          if (i === _.findKey(this.tags, i => i === item)) {
            tmpArr.splice(index, 1);
          }
        });
      } else {
        tmpArr.push(_.findKey(this.tags, i => i === item));
      }
      this.$store.dispatch('updateEnabledEditType', tmpArr);
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
  .editContainer {
    margin: 5px auto 0 auto;
    height: 300px;
    width: 180px;
    .iconContainer {
      height: 15px;
      width: 180px;
      display: flex;
    }
    .moreTagsInfo {
      width: auto;
      height: auto;
      position: absolute;
      background: rgb(76, 76, 76);
      top: 200px;
      outline: none;
      .tagsMargin {
        margin: 5px 0 5px 0;
        width: auto;
        height: auto;
        .tagsContainer {
          height: 15px;
          width: auto;
          font-size: 10px;
          color: rgba(255, 255, 255, 1);
          display: flex;
          p {
            margin-right: 10px;
            margin-left: 5px;
          }
          &:hover {
            background: #434343;
          }
        }
      }
    }
    .tagsScroll {
      width: 180px;
      height: 285px;
      overflow: scroll;
    }
    .edit {
      width: 180px;
      height: auto;
      display: flex;
      flex-direction: column;
      margin: 0 auto 5px auto;
      border-bottom: 0.1px solid rgba(255, 255, 255, 1);
      .tagsType {
        font-size: 13px;
        color: rgba(255, 255, 255, 1);
        margin-bottom: 5px;
      }
      .typeEditInput {
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
}
</style>
