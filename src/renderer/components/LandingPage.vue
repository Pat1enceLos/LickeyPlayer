<template>
  <div id="wrapper">
    <title-bar class="titleBar"></title-bar>
    <top-title class="topTitle"></top-title>
    <main-content class="mainContent"></main-content>
    <play-control class="playControl"></play-control>
  </div>
</template>

<script>
import Titlebar from './Titlebar';
import playControl from './PlayControl';
import topTitle from './TopTitle';
import mainContent from './MainContent';

export default {
  name: 'landing-page',
  components: {
    'title-bar': Titlebar,
    'play-control': playControl,
    'top-title': topTitle,
    'main-content': mainContent,
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .titleBar {
      z-index: 10;
    }
    .topTitle {
      z-index: 8;
    }
  }
</style>
