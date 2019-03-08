<template>
  <div class="mainContainer">
    <left-list></left-list>
    <play-list></play-list>
    <right-settings></right-settings>
  </div>
</template>

<script>
import leftList from './mainContent/leftList';
import rightSettings from './mainContent/rightSettings';
import playlist from './mainContent/playlist';

export default {
  name: 'mainContent',
  components: {
    'left-list': leftList,
    'right-settings': rightSettings,
    'play-list': playlist,
  },
};
</script>

<style scoped lang="scss">
  .mainContainer {
    width: 100%;
    height: 560px;
    display: flex;
    flex-direction: row;
  }
</style>
