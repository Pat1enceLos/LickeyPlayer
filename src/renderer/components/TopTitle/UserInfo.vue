<template>
  <div class="user">
    <div class="imgContainer">
      <Icon type="user" class="defaultImg"></Icon>
      <img v-show="false" class="userImg">
      <Icon type="rightArrow" class="rightArrow" @click.native="handleClick"></Icon>
    </div>
  </div>
</template>

<script>
import Icon from '../BaseIconContainer';

export default {
  name: 'UserInfo',
  components: {
    Icon,
  },
  methods: {
    handleClick() {
      this.$electron.ipcRenderer.send('add-windows-login');
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
    margin: auto 20px 0 auto;
    .defaultImg {
      margin: auto;
    }
    .rightArrow {
      margin: auto;
    }
  }
}
</style>
