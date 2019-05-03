<template>
  <div class="user-container">
    <div class="imgAndName">
      <img class="user-img">
      <p class="user-name">User Name</p>
      <Icon type="userEdit" class="user-edit-icon"></Icon>
    </div>
    <div class="otherInfo">
      <div class="gender"><p>性别: 男</p></div>
      <div class="age"><p>生日: 1997年5月1日</p></div>
    </div>
    <div class="description">
      <p>简介:</p>
      <div class="des-content">
        <p>这个人很懒，什么也没留下.这个人很懒，什么也没留下</p>
      </div>
    </div>
    <div class="log-out">
      <Icon type="logout" class="log-out-icon"></Icon>
      <p>退出登录</p>
    </div>
  </div>
</template>

<script>
import Icon from '../BaseIconContainer.vue';

export default {
  name: 'UserDetails',
  components: {
    Icon,
  },
};
</script>

<style scoped lang="scss">
.user-container {
  position: absolute;
  top: 83px;
  right: 30px;
  width: 210px;
  height: 180px;
  background: white;
  border-radius: 5px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  .imgAndName {
    width: 100%;
    height: 40px;
    border-bottom: 0.3px solid rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    display: flex;
    .user-img {
      width: 30px;
      height: 30px;
      margin: auto 0 auto 15px;
      background: black;
    }
    .user-name {
      margin: auto 0 auto 10px;
      font-size: 13px;
    }
    .user-edit-icon {
      margin: auto 15px auto auto;
    }
  }
  .otherInfo {
    width: 100%;
    height: 40px;
    display: flex;
    font-size: 12px;
    border-bottom: 0.3px solid rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    .gender {
      width: 35%;
      height: 70%;
      display: flex;
      margin: auto;
      border-right: 0.3px solid rgba(0, 0, 0, 0.3);
      box-sizing: border-box;
      p {
        margin: auto;
      }
    }
    .age {
      width: 65%;
      height: 70%;
      display: flex;
      margin: auto;
      p {
        margin: auto;
      }
    }
  }
  .description {
    width: 100%;
    height: 60px;
    display: flex;
    font-size: 12px;
    flex-direction: column;
    border-bottom: 0.3px solid rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    p {
      margin: 4px auto 0 15px;
    }
    .des-content {
      width: 180px;
      height: 34px;
      margin: 0 auto auto 15px;
      p {
        font-size: 11px;
        margin: 0 auto 0 0;
      }
    }
  }
  .log-out {
    width: 100%;
    height: 40px;
    display: flex;
    p {
      font-size: 13px;
      margin: auto auto auto 44px;
    }
    .log-out-icon {
      margin: auto 0 auto 15px;
    }
  }
}
.user-container:before {
  content: "";
  border: 10px solid white;
  border-left-color: transparent;
  border-right-color: transparent;
  border-top-color: transparent;
  border-radius: 5px;
  width: 0;
  height: 0;
  position: absolute;
  right: 9px;
  top: -18px;
}
</style>
