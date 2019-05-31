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
    <div class="login-register-container">
      <login-details class="login-display" :loginToShow.sync="loginToShow" @animationend.native="handleLoginAnimEnd"></login-details>
      <register-details class="register-display" :loginToShow.sync="loginToShow" @animationend.native="handleRegisterAnimEnd"></register-details>
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
      loginToShow: true,
    };
  },
  computed: {
    isDarwin() {
      return process.platform === 'darwin';
    },
  },
  mounted() {
    document.querySelector('.register-display').style.display = 'none';
  },
  watch: {
    loginToShow(val) {
      if (val) {
        document.querySelector('.login-display').style.display = '';
        document.querySelector('.login-display').classList.add('login-show-anim');
        document.querySelector('.login-display').classList.remove('login-hide-anim');
        document.querySelector('.register-display').classList.add('register-hide-anim');
        document.querySelector('.register-display').classList.remove('register-show-anim');
      } else {
        document.querySelector('.login-display').classList.add('login-hide-anim');
        document.querySelector('.login-display').classList.remove('login-show-anim');
        document.querySelector('.register-display').classList.add('register-show-anim');
        document.querySelector('.register-display').classList.remove('register-hide-anim');
        document.querySelector('.register-display').style.display = '';
      }
    },
  },
  methods: {
    handleLoginAnimEnd(e) {
      if (e.target.classList.contains('login-hide-anim')) {
        document.querySelector('.login-display').style.display = 'none';
      }
    },
    handleRegisterAnimEnd(e) {
      if (e.target.classList.contains('register-hide-anim')) {
        document.querySelector('.register-display').style.display = 'none';
      }
    },
    handleClose() {
      electron.remote.getCurrentWindow().close();
    },
  },
};
</script>

<style scoped lang="scss">
.login {
  width: 360px;
  height: 478px;
  background: #505050;
  position: absolute;
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
.login-register-container {
  width: 360px;
  height: 400px;
  overflow: hidden;
  background: #505050;
  top: 78px;
  position: absolute;
}
.login-display, .register-display {
  z-index: 10;
}
.login-show-anim {
  animation: login-show 200ms linear;
}
.login-hide-anim {
  animation: login-hide 200ms linear;
}
.register-show-anim {
  animation: register-show 200ms linear;
}
.register-hide-anim {
  animation: register-hide 200ms linear;
}
@keyframes login-show {
  0% { opacity: 0; transform: translateX(-250px) }
  50% { opacity: 0.5; transform: translateX(-125px) }
  100% { opacity: 1; transform: translateX(0px) }
}
@keyframes login-hide {
  0% { opacity: 1;  transform: translateX(0px) }
  50% { opacity: 0.5;  transform: translateX(-125px) }
  100% { opacity: 0;  transform: translateX(-250px) }
}
@keyframes register-show {
  0% { opacity: 0; transform: translateX(250px) }
  50% { opacity: 0.5; transform: translateX(125px) }
  100% { opacity: 1; transform: translateX(0px) }
}
@keyframes register-hide {
  0% { opacity: 1; transform: translateX(0px) }
  50% { opacity: 0.5; transform: translateX(125px) }
  100% { opacity: 0; transform: translateX(250px) }
}
</style>
