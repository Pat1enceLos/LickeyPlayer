<template>
  <div class="registerContent">
    <input class="id" id="registerId" placeholder="请输入用户名"/>
    <input class="password" id="registerPassword" placeholder="请输入密码" type="password"/>
    <div class="regButton" @mouseup="handleRegister">
      <div class="text">注册</div>
    </div>
    <div class="back" @mouseup="handleBack">
      <div class="backText">返回登陆</div>
    </div>
  </div>
</template>

<script>
import md5 from 'md5';
import infoDB from '../../helpers/infoDB';

export default {
  name: 'RegisterDetails',
  methods: {
    handleBack() {
      this.$bus.$emit('handleBack');
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
            alert('注册成功');
            document.querySelector('#registerId').value = '';
            document.querySelector('#registerPassword').value = '';
            this.$bus.$emit('handleBack');
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
  .regButton {
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
