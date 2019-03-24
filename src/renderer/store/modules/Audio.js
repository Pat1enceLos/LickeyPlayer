const state = {
  src: '',
  title: '',
  singer: '',
  duration: 0,
  currentTime: 0,
  paused: true,
  volume: 25,
  lastVolume: 0,
  playlistQueue: [],
  singleCycle: false,
  playlistQueueToShow: false,
  musicLibraryToShow: false,
  musicLibraryPlaylist: [],
  displayType: true,
};

const getters = {
  src: state => state.src,
  title: state => state.title,
  singer: state => state.singer,
  duration: state => state.duration,
  currentTime: state => state.currentTime,
  paused: state => state.paused,
  volume: state => state.volume,
  lastVolume: state => state.lastVolume,
  playlistQueue: state => state.playlistQueue,
  singleCycle: state => state.singleCycle,
  nextAudio: (state, getters) => {
    const list = state.playlistQueue;
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
    const list = state.playlistQueue;
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
  titleUpdate(state, payload) {
    console.log(payload);
    state.title = payload;
  },
  singerUpdate(state, payload) {
    state.singer = payload;
  },
  playlistQueueUpdate(state, payload) {
    state.playlistQueue = payload.concat(state.playlistQueue);
  },
  playlistQueueToShowUpdate(state, payload) {
    state.playlistQueueToShow = payload;
    if (state.musicLibraryToShow) {
      state.musicLibraryToShow = false;
    }
  },
  musicLibraryPlaylistUpdate(state, payload) {
    state.musicLibraryPlaylist = payload.concat(state.musicLibraryPlaylist);
  },
  musicLibraryToShowUpdate(state, payload) {
    state.musicLibraryToShow = payload;
    if (state.playlistQueueToShow) {
      state.playlistQueueToShow = false;
    }
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
  updateTitle({ commit }, delta) {
    commit('titleUpdate', delta);
  },
  updateSinger({ commit }, delta) {
    commit('singerUpdate', delta);
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
};

export default {
  state,
  mutations,
  actions,
  getters,
};
