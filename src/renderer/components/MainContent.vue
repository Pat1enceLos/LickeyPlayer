<template>
  <div class="mainContent">
    <left-list></left-list>
    <play-list></play-list>
    <right-settings></right-settings>
  </div>
</template>

<script>
import leftList from './mainContent/LeftList';
import rightSettings from './mainContent/RightSettings';
import playlist from './mainContent/Playlist';

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
  .mainContent {
    width: 100%;
    height: 560px;
    display: flex;
    flex-direction: row;
  }
</style>
