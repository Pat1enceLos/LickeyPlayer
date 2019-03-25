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
  musicLibraryToShow: true,
  playlistToShow: '',
  musicLibraryPlaylist: [],
  displayType: true,
  createdPlaylist: [],
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
  createdPlaylist: state => state.createdPlaylist,
  playlistToShow: state => state.playlistToShow,
};
let i = 0;
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
    state.title = payload;
  },
  singerUpdate(state, payload) {
    state.singer = payload;
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
  createdPlaylistUpdate(state) {
    i += 1;
    state.createdPlaylist.push({ name: `未命名歌单 ${i}`, src: [] });
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
        console.log(item.src);
      }
    });
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
  updateCreatedPlaylist({ commit }) {
    commit('createdPlaylistUpdate');
  },
  updatePlaylistToShow({ commit }, delta) {
    commit('playlistToShowUpdate', delta);
  },
  addMusicToPlaylist({ commit }, delta) {
    commit('musicAddToPlaylist', delta);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
