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
    <login-details :loginToShow.sync="loginToShow" v-show="loginToShow"></login-details>
    <register-details v-show="!loginToShow" :loginToShow.sync="loginToShow"></register-details>
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
      loginToShow: true,
    };
  },
  mounted() {
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
}
</style>
