<template>
  <div class="user">
    <div class="imgContainer">
      <Icon type="user" class="defaultImg"></Icon>
      <img v-show="false" class="userImg">
      <Icon type="rightArrow" class="rightArrow" @click.native="handleClick" :style="{ transform: isLogin ? 'rotate(90deg)' : '' }"></Icon>
      <user-details v-show="isLogin && userDetailToShow"></user-details>
    </div>
  </div>
</template>

<script>
import UserDetails from './UserDetails.vue';
import Icon from '../BaseIconContainer.vue';

export default {
  name: 'UserInfo',
  data() {
    return {
      userDetailToShow: false,
    };
  },
  components: {
    Icon,
    'user-details': UserDetails,
  },
  methods: {
    handleClick() {
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
