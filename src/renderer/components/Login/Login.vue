<template>
  <div class="login">
    <div class="mac-icons no-drag"
      v-if="isDarwin"
      @mouseover="state = 'hover'"
      @mouseout="state = 'default'">
      <Icon class="title-button"
        type="titleBarClose"
        :state="state"
        @click.native="handleClose"/>
    </div>
    <Icon class="win-title-button no-drag"
      v-if="!isDarwin"
      @click.native="handleClose"
      type="titleBarWinClose">
    </Icon>
    <div class="loginContent">
      <div class="Logo"></div>
      <div class="home" v-show="pageToShow === 'login'">
        <div class="loginButton" @mouseup="handleLoginUp">
          <div class="text">登陆</div>
        </div>
        <div class="registerButton" @mouseup="handleRegisterUp">
          <div class="text">注册</div>
        </div>
      </div>
      <login-details v-show="pageToShow === 'loginDetails'"></login-details>
      <register-details v-show="pageToShow === 'registerDetails'"></register-details>
    </div>
  </div>
</template>

<script>
import electron from 'electron';
import Icon from '../BaseIconContainer';
import LoginDetails from './LoginDetails';
import RegisterDetails from './RegisterDetails';

export default {
  name: 'Login',
  components: {
    Icon,
    'login-details': LoginDetails,
    'register-details': RegisterDetails,
  },
  data() {
    return {
      state: 'default',
      pageToShow: 'login',
    };
  },
  computed: {
    isDarwin() {
      return process.platform === 'darwin';
    },
  },
  methods: {
    handleClose() {
      electron.remote.BrowserWindow.getFocusedWindow().close();
    },
    handleLoginUp() {
      this.pageToShow = 'loginDetails';
    },
    handleRegisterUp() {
      this.pageToShow = 'registerDetails';
    },
  },
};
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  background: #505050;
  top: 100px;
  .mac-icons {
    position: absolute;
    top: 12px;
    left: 12px;
    width: fit-content;
    display: flex;
    flex-wrap: nowrap;
    .title-button {
      width: 12px;
      height: 12px;
      margin-right: 8px;
      background-repeat: no-repeat;
      -webkit-app-region: no-drag;
      border-radius: 100%;
    }
    .title-button-disable {
      pointer-events: none;
      opacity: 0.25;
    }
  }
  .win-title-button {
    position: absolute;
    top: 0;
    right: 0;
    width: 45px;
    height: 28px;
    background-color: rgba(255,255,255,0);
    transition: background-color 200ms;
    &:hover {
      background-color: rgba(221, 221, 221, 0.2);
    }
    &:active {
      background-color: rgba(221, 221, 221, 0.5);
    }
  }
  .loginContent {
    position: absolute;
    width: 100%;
    height: 400px;
    bottom: 0;
    display: flex;
    flex-direction: column;
    .home {
      width: 100%;
      height: 300px;
      display: flex;
      flex-direction: column;
    }
    .Logo {
      width: 100px;
      height: 100px;
      margin: 0 auto 0 auto;
      background: #c8cccf;
    }
    .loginButton {
      width: 200px;
      height: 40px;
      background: #211C1C;
      margin: 100px auto 10px auto;
      border: 2px solid #C7B36F;
      border-radius: 5px;
      text-align: center;
      display: flex;
    }
    .registerButton {
      width: 200px;
      height: 40px;
      background: #211C1C;
      border: 2px solid #C7B36F;
      border-radius: 5px;
      margin: 0 auto auto auto;
      text-align: center;
      display: flex;
    }
    .text {
      color: #AA8B24;
      width: auto;
      height: auto;
      margin: auto;
    }
  }
}
</style>
