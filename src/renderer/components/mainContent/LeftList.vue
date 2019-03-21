<template>
  <div class="leftList">
    <div class="topContainer">
      <div class="library">
        <Icon type="music" class="libLogo"></Icon>
        <div class="libText">Music Library</div>
      </div>
      <div class="queue">
        <Icon type="queue" class="queLogo"></Icon>
        <div class="queText">Playback Queue</div>
      </div>
      <div class="switch">
        <Icon type="switch" class="switchLogo"></Icon>
        <div class="switchText">Switch Display</div>
      </div>
      <div class="import">
        <Icon type="import" class="importLogo"></Icon>
        <div class="importText">Music Import</div>
      </div>
      <div class="export">
        <Icon type="export" class="exportLogo"></Icon>
        <div class="exportText">Music Export</div>
      </div>
    </div>
    <div class="separate">
      <div class="seText">MY PLAYLIST</div>
      <Icon type="addPlaylist" class="addLogo"></Icon>
    </div>
  </div>
</template>

<script>
import Icon from '../BaseIconContainer';

export default {
  name: 'leftList',
  components: {
    Icon,
  },
};
</script>

<style scoped lang="scss">
  .leftList {
    width: 100%;
    height: 100%;
    min-width: 100px;
    background: #707070;
    display: flex;
    flex-direction: column;
    .topContainer {
      width: auto;
      min-width: 150px;
      height: 140px;
      display: flex;
      flex-direction: column;
      font-size: 12px;
      color: rgba(255, 255, 255, 1);
      letter-spacing: 0.4px;
      margin: 10px auto 10px 10px;
      overflow: hidden;
      white-space: nowrap;
      .library {
        flex: 1;
        display: flex;
        .libText {
          cursor: pointer;
          margin: auto auto auto 10px;
        }
        .libLogo {
          width: 15px;
          height: 15px;
          margin: auto 0 auto 10px;
          display: flex;
        }
      }
      .queue {
        flex: 1;
        display: flex;
        .queText {
          cursor: pointer;
          margin: auto auto auto 10px;
        }
        .queLogo {
          width: 15px;
          height: 15px;
          margin: auto 0 auto 10px;
          display: flex;
        }
      }
      .switch {
        flex: 1;
        display: flex;
        .switchText {
          cursor: pointer;
          margin: auto auto auto 10px;
        }
        .switchLogo {
          width: 15px;
          height: 15px;
          margin: auto 0 auto 10px;
          display: flex;
        }
      }
      .import {
        flex: 1;
        display: flex;
        .importText {
          cursor: pointer;
          margin: auto auto auto 10px;
        }
        .importLogo {
          width: 15px;
          height: 15px;
          margin: auto 0 auto 10px;
          display: flex;
        }
      }
      .export {
        flex: 1;
        display: flex;
        .exportText {
          cursor: pointer;
          margin: auto auto auto 10px;
        }
        .exportLogo {
          width: 15px;
          height: 15px;
          margin: auto 0 auto 10px;
          display: flex;
        }
      }
    }
    .separate {
      width: 100%;
      height: 35px;
      background: rgb(75, 75, 75);
      display: flex;
      .seText {
        color: rgba(255, 255, 255, 1);
        font-size: 13px;
        margin: auto 0 auto 20px;
      }
      .addLogo {
        width: 30px;
        height: 100%;
        margin: auto 20px auto auto;
        display: flex;
      }
    }
  }
</style>
