<template>
  <div class="registerContent">
    <input class="registerUser" id="registerId" placeholder="用户名"/>
    <input class="registerPassword" id="registerPassword" placeholder="密码" type="password"/>
    <div class="registerButton" @mouseup="handleRegister">
      <div class="text">注册</div>
    </div>
    <div class="turnBack" @mouseup="turnBack">返回登陆</div>
  </div>
</template>

<script>
import md5 from 'md5';
import infoDB from '../../helpers/infoDB';

export default {
  name: 'RegisterDetails',
  methods: {
    turnBack() {
      this.$emit('update:loginToShow', true);
    },
    async handleRegister() {
      const inputId = document.querySelector('#registerId').value;
      const inputPassword = document.querySelector('#registerPassword').value;
      let isExisted = false;
      const reg = /^\w{5,21}$/;
      if (reg.test(inputId)) {
        if (inputPassword === '') {
          alert('密码不能为空');
        } else {
          const existedUser = await infoDB.getAll('User');
          existedUser.forEach(({ id }) => {
            if (id === inputId) {
              isExisted = true;
            }
          });
          if (isExisted) {
            alert('已存在该用户名');
          } else {
            const userInfo = {
              id: inputId,
              password: md5(inputPassword),
            };
            await infoDB.add('User', userInfo);
            await infoDB.add('AudioInfo', { id: inputId });
            alert('注册成功');
            document.querySelector('#registerId').value = '';
            document.querySelector('#registerPassword').value = '';
            this.$emit('update:loginToShow', true);
          }
        }
      } else if (inputId.length < 5) {
        alert('用户名长度大于五个字符');
      } else if (inputId > 20) {
        alert('用户名长度小于十个字符');
      }
    },
  },
};
</script>

<style scoped lang="scss">
.registerContent {
  position: absolute;
  width: 100%;
  height: 400px;
  bottom: 0;
  display: flex;
  flex-direction: column;
  .registerUser {
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
  .registerPassword {
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
  .registerButton {
    width: 250px;
    height: 50px;
    background: #FFCF2E;
    margin: 80px auto 0 auto;
    border-radius: 5px;
    display: flex;
    .text {
      margin: auto;
      font-size: 18px;
      color: rgba(0, 0, 0, 1);
    }
  }
  .turnBack {
    margin: 70px auto auto auto;
    font-size: 12px;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
