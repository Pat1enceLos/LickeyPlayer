<template>
  <div class="searchInput">
    <input class="input">
    <Icon type="search"></Icon>
  </div>
</template>

<script>
import Icon from '../BaseIconContainer';

export default {
  name: 'Search',
  components: {
    Icon,
  },
};
</script>

<style scoped lang="scss">
  .searchInput {
    width: 580px;
    display: flex;
    .input {
      width: 200px;
      height: 25px;
      margin: auto auto 10px 50px;
      border:1px solid #c8cccf;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.8);
      outline: none;
      text-indent: 28px;
      font-size: 12px;
    }
  }
</style>
