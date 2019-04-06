<template>
  <div class="tagEdit" ref="tagsEdit">
    <div class="logoEdit">
      <img :src='picture' :style="{ width: '100%', height: '100%' }" v-show="picture">
    </div>
    <div class="editContainer">
      <div class="edit" v-for="(item, index) in enabledEditType">
        <div class="tagsType">{{ item }}</div>
        <input class="typeEditInput" :class="`${item}EditInput`" v-model="types[item]" @input="handleTypeInput(item, index)"/>
        <Icon v-show="modifyToShow[index][item]" type="save" :style="{ position: 'absolute', transform: 'translate(780%, 125%)', cursor: 'pointer' }" @mouseup.native="saveEdit(item, index)"></Icon>
      </div>
    </div>
    <!--<div class="titleEdit">-->
      <!--<div class="titleTags">Title</div>-->
      <!--<input class="titleEditInput" v-model="title" @input="handleTitleInput"/>-->
      <!--<Icon v-show="titleTags" type="save" :style="{ position: 'absolute', transform: 'translate(780%, 125%)', cursor: 'pointer' }" @mouseup.native="saveTitle"></Icon>-->
    <!--</div>-->
    <!--<div class="artistEdit">-->
      <!--<div class="artistTags">Artist</div>-->
      <!--<input class="artistEditInput" v-model="artist" @input="handleArtistInput"/>-->
      <!--<Icon v-show="artistTags" type="save" :style="{ position: 'absolute', transform: 'translate(780%, 125%)', cursor: 'pointer' }" @mouseup.native="saveArtist"></Icon>-->
    <!--</div>-->
    <!--<div class="albumEdit">-->
      <!--<div class="albumTags">Album</div>-->
      <!--<input class="albumEditInput" v-model="album" @input="handleAlbumInput"/>-->
      <!--<Icon v-show="albumTags" type="save" :style="{ position: 'absolute', transform: 'translate(780%, 125%)', cursor: 'pointer' }" @mouseup.native="saveAlbum"></Icon>-->
    <!--</div>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
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
      ],
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
    margin: 20px auto 0 auto;
    height: 300px;
    width: 180px;
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
