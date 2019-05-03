<template>
  <div class="user-container"></div>
</template>

<script>
export default {
  name: 'UserDetails',
};
</script>

<style scoped lang="scss">
.user-container {
  position: absolute;
  top: 83px;
  right: 30px;
  width: 210px;
  height: 190px;
  background: white;
  border-radius: 5px;
  z-index: 100;
}
.user-container:before {
  content: "";
  border: 10px solid white;
  border-left-color: transparent;
  border-right-color: transparent;
  border-top-color: transparent;
  border-radius: 5px;
  width: 0;
  height: 0;
  position: absolute;
  right: 9px;
  top: -18px;
}
</style>
