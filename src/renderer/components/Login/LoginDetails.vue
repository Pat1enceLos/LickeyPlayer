<template>
  <div class="loginContainer">
    <input class="id" id="loginId" placeholder="请输入用户名"/>
    <input class="password" id="loginPassword" placeholder="请输入密码" type="password"/>
    <div class="loginButton" @mouseup="handleLogin">
      <div class="text">登陆</div>
    </div>
    <div class="back" @mouseup="handleBack">
      <div class="backText">返回注册</div>
    </div>
  </div>
</template>

<script>
import md5 from 'md5';
import infoDB from '../../helpers/infoDB';

export default {
  name: 'LoginDetails',
  methods: {
    handleBack() {
      this.$bus.$emit('handleBack');
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
              alert('登陆成功');
              document.querySelector('#registerId').value = '';
              document.querySelector('#registerPassword').value = '';
            } else {
              alert('密码错误');
            }
          }
        });
        if (!isExisted) {
          alert('不存在该用户名');
        }
      } else {
        alert('用户名格式不正确');
      }
    },
  },
};
</script>

<style scoped lang="scss">
.loginContainer {
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  .id {
    width: 200px;
    height: 30px;
    background: #c8cccf;
    margin: 80px auto 5px auto;
    border-radius: 5px;
    font-size: 15px;
    text-indent: 10px;
  }
  .password {
    width: 200px;
    height: 30px;
    background: #c8cccf;
    margin: 0 auto 0 auto;
    border-radius: 5px;
    font-size: 15px;
    text-indent: 10px;
  }
  .loginButton {
    width: 200px;
    height: 40px;
    margin: 20px auto;
    background: #211C1C;
    border: 2px solid #C7B36F;
    border-radius: 5px;
    display: flex;
    .text {
      color: #AA8B24;
      width: auto;
      height: auto;
      margin: auto;
    }
  }
  .back {
    width: auto;
    height: 20px;
    margin: auto auto 15px auto;
    cursor: pointer;
    &:hover {
      border-bottom: 1px solid #AA8B24;
    }
    .backText {
      font-size: 15px;
      margin: auto;
      color: #AA8B24;
    }
  }
}
</style>
