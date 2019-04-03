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
  data() {
    return {
      suggestInfo: [],
      inputContent: '',
    };
  },
  mounted() {
    this.suggestInfo = this.loadAll();
  },
  methods: {
    querySearch(queryString, cb) {
      const restaurants = this.suggestInfo;
      const results = queryString ? restaurants
        .filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => (restaurant.value.toLowerCase()
        .indexOf(queryString.toLowerCase()) === 0);
    },
    loadAll() {
      return [
      ];
    },
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
      text-indent: 28px;
      outline: none;
      font-size: 12px;
    }
  }
</style>
