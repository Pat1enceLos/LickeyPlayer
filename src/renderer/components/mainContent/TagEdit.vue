<template>
  <div class="tagEdit" ref="tagsEdit">
    <div class="logoEdit">
      <div class="mask" v-show="!tagsToShow"></div>
      <img :src='picture' :style="{ width: '180px', height: '180px', position: 'absolute' }" v-show="picture">
      <Icon type="coverDelete" @mouseup.native="deleteCover" v-show="!tagsToShow && picture" :style="{ width: 'auto', height: 'auto', margin: 'auto 0 5px 5px', zIndex: '6', cursor: 'pointer' }"></Icon>
      <Icon type="coverEdit" @mouseup.native="editCover" v-show="!tagsToShow" :style="{ width: 'auto', height: 'auto', margin: picture ? 'auto auto auto 60px' : 'auto auto auto 80px', zIndex: '6', cursor: 'pointer' }"></Icon>
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
        <Icon type="edit" @mouseup.native="editShift"></Icon>
        <Icon type="addTags" @mouseup.native="addMoreTags"></Icon>
      </div>
      <div class="tagsScroll" :style="{ overflowY: enabledEditType.length > 6 ? 'scroll' : ''}">
        <div class="edit" v-for="(item) in enabledEditType">
          <div class="tagsType">{{ item }}</div>
          <div class="editContent">
            <div v-show="tagsToShow" class="normalShow">{{ types[item] }}</div>
            <input v-show="!tagsToShow" class="typeEditInput" :class="`${item}EditInput`" v-model="types[item]" @input="handleTypeInput(item)"/>
            <Icon v-show="modifyToShow[item] && !tagsToShow" type="save" class="tagsChanged" @mouseup.native="saveEdit(item)"></Icon>
          </div>
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
      modifyToShow: {
        title: false,
        artists: false,
        album: false,
        trackNo: false,
        totalTracks: false,
        diskNo: false,
        totalDisk: false,
        year: false,
        BMP: false,
        genre: false,
        albumArtist: false,
        composer: false,
        performer: false,
        publisher: false,
        description: false,
        comment: false,
        rating: false,
        duration: false,
        sampleRate: false,
        channels: false,
        bits: false,
        bitrate: false,
        codec: false,
        encoding: false,
      },
      tags: {
        title: 'Title',
        artists: 'Artist',
        album: 'Album',
        trackNo: 'Track No.',
        totalTracks: 'Total Tracks',
        diskNo: 'Disc No.',
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
      tagsToShow: true,
    };
  },
  components: {
    Icon,
  },
  computed: {
    ...mapGetters(['currentAudioInfo', 'src', 'enabledEditType']),
    picture() {
      return this.currentAudioInfo && this.currentAudioInfo.picture.length && !_.isEmpty(this.currentAudioInfo.picture[0].data) ? `data:image/jpeg;base64,${this.currentAudioInfo.picture[0].data.toString('base64')}` : '';
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
    currentAudioInfo(val) {
      if (val) {
        this.enabledEditType.forEach((item) => {
          this.types[item] = val[item];
        });
      } else {
        this.types = {};
      }
    },
    enabledEditType(val) {
      if (this.currentAudioInfo) {
        val.forEach((item) => {
          this.types[item] = this.currentAudioInfo[item];
        });
      } else {
        this.types = {};
      }
    },
  },
  mounted() {
  },
  methods: {
    deleteCover() {
      this.$store.dispatch('updateMusicCover', {});
    },
    editCover() {
      this.changeMusicCover();
    },
    editShift() {
      this.tagsToShow = !this.tagsToShow;
      if (this.tagsToShow) {
        this.enabledEditType.forEach((item) => {
          this.types[item] = this.currentAudioInfo[item];
        });
      } else {
        this.enabledEditType.forEach((item) => {
          this.modifyToShow[item] = false;
        });
      }
    },
    selectedToShow(item) {
      return this.enabledEditType.includes(_.findKey(this.tags, i => i === item));
    },
    saveEdit(item) {
      const newVal = document.querySelector(`.${item}EditInput`).value;
      const newCurrentAudioInfo = Object.assign({}, this.currentAudioInfo);
      newCurrentAudioInfo[item] = newVal;
      this.$store.dispatch('updateCurrentAudioInfo', newCurrentAudioInfo);
      this.modifyToShow[item] = false;
    },
    handleTypeInput(item) {
      this.modifyToShow[item] = document.querySelector(`.${item}EditInput`).value !== this.currentAudioInfo[item];
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
::-webkit-scrollbar {
  width: 3.5px;
}
::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.15);
  border-radius: 3px;
}
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
    display: flex;
    .mask {
      position: absolute;
      width: 180px;
      height: 180px;
      background: rgba(0, 0, 0, 0.3);
      z-index: 5;
    }
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
      z-index: 8;
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
    }
    .edit {
      width: 176px;
      height: auto;
      display: flex;
      flex-direction: column;
      margin: 0 auto 5px auto;
      border-bottom: 0.1px solid rgba(255, 255, 255, 1);
      .editContent {
        width: 176px;
        height: auto;
        display: flex;
        flex-direction: row;
        .tagsChanged {
          width: auto;
          height: auto;
          margin: auto auto auto 10px;
          cursor: pointer;
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
        .normalShow {
          font-size: 13px;
          color: rgba(255, 255, 255, 1);
          height: 24px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
      .tagsType {
        font-size: 13px;
        color: rgba(255, 255, 255, 1);
        margin-bottom: 5px;
      }
    }
  }
}
</style>
