<template>
  <div class="topTitle">
    <logo></logo>
    <search></search>
    <user-info></user-info>
  </div>
</template>

<script>
import Search from './TopTitle/Search';
import Logo from './TopTitle/Logo';
import UserInfo from './TopTitle/UserInfo';

export default {
  name: 'topTitle',
  components: {
    search: Search,
    logo: Logo,
    'user-info': UserInfo,
  },
};
</script>

<style scoped lang="scss">
  .topTitle {
    width: 100%;
    height: 80px;
    background: #2C2C2C;
    display: flex;
    flex-direction: row;
  }
</style>
