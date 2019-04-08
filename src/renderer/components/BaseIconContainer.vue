<template>
  <div>
    <svg :class="hoverState">
      <use class='default' v-bind="{'xlink:href': `#${type}-${finalState}-${finalEffect}`}"></use>
      <use class="hover" v-bind="{'xlink:href': `#${type}-hover-${finalEffect}`}"></use>
      <use class="active" v-bind="{'xlink:href': `#${type}-active-${finalEffect}`}"></use>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    type: {
      type: String,
    },
    effect: {
      type: String,
    },
    state: {
      type: String,
    },
    isFullScreen: {
      type: String,
    },
  },
  computed: {
    finalState() {
      return this.state === 'hover' && this.isFullScreen !== 'exit-fullscreen' ? this.state : 'default';
    },
    hoverState() {
      return this.state === 'hover' ? 'hoverState' : this.type;
    },
    finalEffect() {
      return this.effect ? this.effect : 'icon';
    },
  },
  created() {
    const requireAll = requireContext => requireContext.keys().map(requireContext);
    const req = require.context('@/assets/icon', true, /\.svg$/);
    requireAll(req);
  },
};
</script>

<style lang="scss" scoped>
.titleBarWinExitFull, .titleBarWinFull, .titleBarWinClose, .titleBarWinRestore, .titleBarWinResize {
  display: flex;
  width: 45px;
  height: 28px;
}
.hoverState {
  display: flex;
  width: 12px;
  height: 12px;
  margin-right: 8px;
  background-repeat: no-repeat;
  -webkit-app-region: no-drag;
  border-radius: 100%;
  .default {
    opacity: 1;
    display: block;
  }
  .hover {
    display: none;
  }
  .active {
    display: none;
  }
  &:active {
    .default {
      display: none;
    }
    .hover {
      display: none;
    }
    .active {
      display: block;
    }
  }
}
.titleBarFull, .titleBarExitFull, .titleBarClose, .titleBarRecover {
  display: flex;
  width: 12px;
  height: 12px;
  margin-right: 8px;
  background-repeat: no-repeat;
  -webkit-app-region: no-drag;
  opacity: 0.5;
  border-radius: 100%;
  .default {
    display: block;
  }
  .hover {
    display: none;
  }
  .active {
    display: none;
  }
  &:hover {
    opacity: 1;
    .default {
      display: none;
    }
    .hover {
      display: block;
    }
    .active {
      display: none;
    }
  }
  &:active {
    .default {
      display: none;
    }
    .hover {
      display: none;
    }
    .active {
      display: block;
    }
  }
}
.play, .pause {
  display: block;
  width: 30px;
  height: 30px;
}
.pre, .next {
  display: block;
  width: 25px;
  height: 25px;
}
.singleCycle, .playlistCycle, .random, .volume, .mute {
  display: block;
  width: 20px;
  height: 20px;
}
.search {
  display: block;
  width: 20px;
  height: 20px;
  position: absolute;
  left: 305px;
  top: 47px;
  cursor: pointer;
}
.user {
  display: block;
  width: 32px;
  height: 32px;
}
.rightArrow {
  width: 25px;
  height: 25px;
  cursor: pointer;
}
.music, .queue, .switch, .import, .export {
  display: block;
  width: 13px;
  height: 13px;
  margin: auto;
}
.addPlaylist {
  display: block;
  width: 30px;
  height: 30px;
  margin: auto auto auto 10px;
  cursor: pointer;
}
.playing {
  display: block;
  width: 9px;
  height: 9px;
  margin: auto;
}
.playlist {
  display: flex;
  width: 12px;
  height: 12px;
  margin: auto;
}
.save {
  display: flex;
  width: 20px;
  height: 20px;
}
.moreInfo {
  display: block;
  width: 13px;
  height: 13px;
}
.edit {
  display: block;
  width: 15px;
  height: 15px;
  margin: auto 5px auto 145px;
  cursor: pointer;
}
.addTags {
  display: block;
  width: 15px;
  height: 15px;
  margin: auto auto auto 0;
  cursor: pointer;
}
.tagsSelected {
  display: block;
  width: 10px;
  height: 10px;
}
.coverDelete {
  display: block;
  width: 15px;
  height: 15px;

}
.coverEdit {
  display: block;
  width: 25px;
  height: 25px;
}
</style>
