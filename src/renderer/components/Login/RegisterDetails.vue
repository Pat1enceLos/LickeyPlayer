<template>
  <div class="registerContent">
    <input class="id" placeholder="请输入用户名"/>
    <input class="password" placeholder="请输入密码"/>
    <div class="regButton">
      <div class="text">注册</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterDetails',
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
}
</style>
