<template>
  <div class="playlistHandlerContainer">
    <div class="playlistPlayNow" :style="{ marginTop: '5px' }">
      <div class="handlerText">Play Now</div>
    </div>
    <div class="playlistAddToQueue">
      <div class="handlerText">Add To Queue</div>
    </div>
    <div class="addMusic">
      <div class="handlerText">Import Music</div>
    </div>
    <div class="playlistExport">
      <div class="handlerText">Export List</div>
    </div>
    <div class="rename">
      <div class="handlerText">Rename</div>
    </div>
    <div class="playlistRemove" :style="{ marginBottom: '5px' }">
      <div class="handlerText">Delete</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'playlistHandler',
  props: {
    name: {
      type: String,
    },
    ifRightClick: {
      type: Boolean,
    },
  },
  methods: {
  },
};
</script>

<style scoped lang="scss">
.playlistHandlerContainer {
  position: absolute;
  width: 150px;
  height: auto;
  background: #767676;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  z-index: 10;
  .playlistPlayNow, .playlistAddToQueue, .addMusic, .playlistExport, .rename, .playlistRemove {
    width: 100%;
    height: 30px;
    color: rgba(255, 255, 255, 1);
    font-size: 13px;
    display: flex;
    &:hover {
     background: #434343;
    }
  }
  .handlerText {
    margin: auto auto auto 15px;
  }
}
</style>
