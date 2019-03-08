<template>
  <div id="app" class="application">
    <router-view></router-view>
  </div>
</template>

<script>
import '@/css/style.scss';
export default {
  name: 'lickeymusic',
  methods: {
    mainCommitProxy(commitType, commitPayload) {
      this.$store.dispatch(commitType, commitPayload);
    },
  },
  mounted() {
    this.$electron.ipcRenderer.on('mainCommit', (event, commitType, commitPayload) => {
      this.mainCommitProxy(commitType, commitPayload);
    });
  },
};
</script>

<style>
  /* CSS */
</style>
