<template>
  <div class="loginContent">
    <input class="loginUser" id="loginId"placeholder="用户名" autofocus/>
    <input class="loginPassword" id="loginPassword" placeholder="密码" type="password"/>
    <div class="loginButton" @mouseup="handleLogin">
      <div class="text">登录</div>
    </div>
    <div class="turnToRegister" @mouseup="turnRegister">创建账号</div>
  </div>
</template>

<script>
import electron from 'electron';
import md5 from 'md5';
import infoDB from '../../helpers/infoDB';

export default {
  name: 'LoginDetails',
  props: {
    loginToShow: {
      type: Boolean,
    },
  },
  watch: {
    loginToShow(val) {
      setTimeout(() => {
        if (val) {
          document.querySelector('.loginUser').focus();
        } else {
          document.querySelector('.registerUser').focus();
        }
      }, 0);
    },
  },
  methods: {
    turnRegister() {
      this.$emit('update:loginToShow', false);
    },
    async handleLogin() {
      const inputId = document.querySelector('#loginId').value;
      const inputPassword = document.querySelector('#loginPassword').value;
      let isExisted = false;
      const reg = /^\w{5,21}$/;
      if (reg.test(inputId)) {
        const existedUser = await infoDB.getAll('User');
        existedUser.forEach(({ id, password }) => {
          if (id === inputId) {
            isExisted = true;
            if (md5(inputPassword) === password) {
              console.log('登陆成功');
              document.querySelector('#registerId').value = '';
              document.querySelector('#registerPassword').value = '';
              electron.ipcRenderer.send('login-info', inputId);
              electron.remote.getCurrentWindow().close();
            } else {
              electron.ipcRenderer.send('notification-info', { content: '密码错误', dismissAfter: 2000 });
            }
          }
        });
        if (!isExisted) {
          electron.ipcRenderer.send('notification-info', { content: '不存在该用户名', dismissAfter: 3000 });
        }
      } else {
        electron.ipcRenderer.send('notification-info', { content: '用户名格式不正确', dismissAfter: 3000 });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.loginContent {
  position: absolute;
  width: 100%;
  height: 400px;
  bottom: 0;
  display: flex;
  flex-direction: column;
  .loginUser {
    width: 250px;
    height: 40px;
    margin: 40px auto 0 auto;
    background: #505050;
    outline: none;
    border: none;
    border-bottom: 0.5px solid white;
    font-size: 15px;
    text-indent: 5px;
    color: rgba(255, 255, 255, 1);
  }
  .loginPassword {
    width: 250px;
    height: 40px;
    margin: 20px auto 0 auto;
    background: #505050;
    outline: none;
    border: none;
    border-bottom: 0.5px solid white;
    font-size: 15px;
    text-indent: 5px;
    color: rgba(255, 255, 255, 1);
  }
  .text {
    color: #AA8B24;
    width: auto;
    height: auto;
    margin: auto;
  }
  .loginButton {
    width: 250px;
    height: 50px;
    background: #FFCF2E;
    margin: 80px auto 0 auto;
    border-radius: 5px;
    display: flex;
    cursor: pointer;
    &:active {
      background: #FDDE58;
    }
    .text {
      margin: auto;
      font-size: 18px;
      color: rgba(0, 0, 0, 1);
    }
  }
  .turnToRegister {
    margin: 70px auto auto auto;
    font-size: 12px;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
  }
}
</style>
