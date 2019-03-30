import * as mm from 'music-metadata';

const state = {
  src: '',
  audioInfo: [],
  duration: 0,
  currentTime: 0,
  paused: true,
  volume: 25,
  lastVolume: 0,
  playlistQueue: [],
  singleCycle: false,
  playlistQueueToShow: false,
  musicLibraryToShow: true,
  playlistToShow: '',
  musicLibraryPlaylist: [],
  displayType: true,
  createdPlaylist: [],
};

const getters = {
  src: state => state.src,
  duration: state => state.duration,
  currentTime: state => state.currentTime,
  paused: state => state.paused,
  volume: state => state.volume,
  lastVolume: state => state.lastVolume,
  playlistQueue: state => state.playlistQueue,
  singleCycle: state => state.singleCycle,
  nextAudio: (state, getters) => {
    let list = [];
    if (getters.playlistQueueToShow) {
      list = state.playlistQueue;
    } else if (getters.musicLibraryToShow) {
      list = state.musicLibraryPlaylist;
    } else {
      this.createdPlaylist.forEach((item) => {
        if (item.name === this.playlistToShow) {
          list = item.src;
        }
      });
    }
    const index = list.findIndex(value => value === getters.src);
    if (!getters.singleCycle) {
      if (index !== -1 && index + 1 < list.length) {
        return list[index + 1];
      } else if (index + 1 >= list.length) {
        return list[0];
      }
    }
    return '';
  },
  preAudio: (state, getters) => {
    let list = [];
    if (getters.playlistQueueToShow) {
      list = state.playlistQueue;
    } else if (getters.musicLibraryToShow) {
      list = state.musicLibraryPlaylist;
    } else {
      this.createdPlaylist.forEach((item) => {
        if (item.name === this.playlistToShow) {
          list = item.src;
        }
      });
    }
    const index = list.findIndex(value => value === getters.src);
    if (index !== 0 && index - 1 < list.length) {
      return list[index - 1];
    } else if (index === 0) {
      return list[0];
    }
    return '';
  },
  playlistQueueToShow: state => state.playlistQueueToShow,
  musicLibraryPlaylist: state => state.musicLibraryPlaylist,
  musicLibraryToShow: state => state.musicLibraryToShow,
  displayType: state => state.displayType,
  createdPlaylist: state => state.createdPlaylist,
  playlistToShow: state => state.playlistToShow,
  audioInfo: state => state.audioInfo,
  currentAudioInfo: (state, getters) => state.audioInfo.find(item => item.src === getters.src),
};
const mutations = {
  durationUpdate(state, payload) {
    state.duration = payload;
  },
  currentTimeUpdate(state, payload) {
    state.currentTime = payload;
  },
  pausedUpdate(state, payload) {
    state.paused = payload;
  },
  volumeUpdate(state, payload) {
    state.volume = payload;
  },
  muteUpdate(state) {
    state.lastVolume = state.volume;
    state.volume = 0;
  },
  srcUpdate(state, payload) {
    state.src = payload;
  },
  playlistQueueUpdate(state, payload) {
    payload.forEach((item) => {
      if (!state.playlistQueue.includes(item)) {
        state.playlistQueue.unshift(item);
      }
    });
  },
  playlistQueueToShowUpdate(state, payload) {
    state.playlistQueueToShow = payload;
    if (state.musicLibraryToShow) {
      state.musicLibraryToShow = false;
    }
    state.playlistToShow = '';
  },
  musicLibraryPlaylistUpdate(state, payload) {
    payload.forEach((item) => {
      if (!state.musicLibraryPlaylist.includes(item)) {
        state.musicLibraryPlaylist.unshift(item);
      }
    });
  },
  musicLibraryToShowUpdate(state, payload) {
    state.musicLibraryToShow = payload;
    if (state.playlistQueueToShow) {
      state.playlistQueueToShow = false;
    }
    state.playlistToShow = '';
  },
  musicFromQueueRemove(state, payload) {
    state.playlistQueue.splice(state.playlistQueue.indexOf(payload), 1);
  },
  musicFromLibraryRemove(state, payload) {
    state.musicLibraryPlaylist.splice(state.musicLibraryPlaylist.indexOf(payload), 1);
  },
  displayTypeUpdate(state) {
    state.displayType = !state.displayType;
  },
  createdPlaylistUpdate(state, payload) {
    state.createdPlaylist.push({ name: payload, src: [] });
  },
  playlistToShowUpdate(state, payload) {
    state.playlistToShow = payload;
    if (state.playlistQueueToShow) {
      state.playlistQueueToShow = false;
    }
    if (state.musicLibraryToShow) {
      state.musicLibraryToShow = false;
    }
  },
  musicAddToPlaylist(state, payload) {
    state.createdPlaylist.forEach((item) => {
      if (item.name === state.playlistToShow && !item.src.includes(payload)) {
        payload.forEach((src) => {
          console.log(src);
          if (!item.src.includes(src)) {
            item.src.unshift(src);
          }
        });
      }
    });
  },
  audioInfoUpdate(state, payload) {
    state.audioInfo.unshift(payload);
  },
  currentAudioInfoUpdate(state, payload) {
    state.audioInfo.forEach((item, index) => {
      if (item.src === state.src) {
        state.audioInfo.splice(index, 1, payload);
      }
    });
    console.log(payload);
  },
};

const actions = {
  updateDuration({ commit }, delta) {
    commit('durationUpdate', delta);
  },
  updateCurrentTime({ commit }, delta) {
    commit('currentTimeUpdate', delta);
  },
  updatePaused({ commit }, delta) {
    commit('pausedUpdate', delta);
  },
  updateVolume({ commit }, delta) {
    commit('volumeUpdate', delta);
  },
  updateMute({ commit }) {
    commit('muteUpdate');
  },
  updateSrc({ commit }, delta) {
    commit('srcUpdate', delta);
  },
  updatePlaylistQueue({ commit }, delta) {
    commit('playlistQueueUpdate', delta);
  },
  updatePlaylistQueueToShow({ commit }, delta) {
    commit('playlistQueueToShowUpdate', delta);
  },
  updateMusicLibraryPlaylist({ commit }, delta) {
    commit('musicLibraryPlaylistUpdate', delta);
  },
  updateMusicLibraryToShow({ commit }, delta) {
    commit('musicLibraryToShowUpdate', delta);
  },
  removeMusicFromQueue({ commit }, delta) {
    commit('musicFromQueueRemove', delta);
  },
  removeMusicFromLibrary({ commit }, delta) {
    commit('musicFromLibraryRemove', delta);
  },
  updateDisplayType({ commit }) {
    commit('displayTypeUpdate');
  },
  updateCreatedPlaylist({ commit }, delta) {
    commit('createdPlaylistUpdate', delta);
  },
  updatePlaylistToShow({ commit }, delta) {
    commit('playlistToShowUpdate', delta);
  },
  addMusicToPlaylist({ commit }, delta) {
    commit('musicAddToPlaylist', delta);
  },
  updateAudioInfo({ commit }, delta) {
    delta.forEach(async (item) => {
      const metadata = await mm.parseFile(item);
      console.log(metadata);
      commit('audioInfoUpdate', {
        src: item,
        title: metadata.common.title,
        artists: metadata.common.artists,
        album: metadata.common.album,
        year: metadata.common.year,
        track: metadata.common.track,
        fileType: metadata.format.dataformat,
        duration: metadata.format.duration,
        picture: metadata.common.picture,
      });
    });
  },
  updateCurrentAudioInfo({ commit }, delta) {
    commit('currentAudioInfoUpdate', delta);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
