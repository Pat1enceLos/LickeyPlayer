<template>
  <div class="user">
    <div class="imgContainer">
      <Icon type="user" class="defaultImg"></Icon>
      <img v-show="false" class="userImg">
      <Icon type="rightArrow" class="rightArrow" @mousedown.native="handleMousedown" :style="{ transform: isLogin ? 'rotate(90deg)' : '' }"></Icon>
      <user-details :userDetailToShow.sync="userDetailToShow"></user-details>
      <user-editor v-show="userEditorToShow"></user-editor>
    </div>
  </div>
</template>

<script>
import UserDetails from './UserDetails.vue';
import UserEditor from './UserEdit';
import Icon from '../BaseIconContainer.vue';

export default {
  name: 'UserInfo',
  data() {
    return {
      userDetailToShow: false,
      userEditorToShow: false,
    };
  },
  components: {
    Icon,
    'user-details': UserDetails,
    'user-editor': UserEditor,
  },
  mounted() {
    this.$bus.$on('user-editor-show', () => {
      this.userEditorToShow = true;
    });
    this.$bus.$on('edit-finished', () => {
      this.userEditorToShow = false;
      this.userDetailToShow = true;
    });
  },
  methods: {
    handleMousedown() {
      if (!this.isLogin) {
        this.$electron.ipcRenderer.send('add-windows-login');
      } else {
        this.userDetailToShow = !this.userDetailToShow;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.user {
  width: 250px;
  height: 100%;
  display: flex;
  flex-direction: row;
  .imgContainer {
    width: 55px;
    height: 50px;
    display: flex;
    margin: auto 10px 0 auto;
    .defaultImg {
      margin: auto;
    }
    .rightArrow {
      margin: auto;
    }
  }
}
</style>
