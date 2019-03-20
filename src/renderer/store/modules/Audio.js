const state = {
  src: '',
  title: '',
  singer: '',
  duration: 0,
  currentTime: 0,
  paused: true,
  volume: 75,
  lastVolume: 0,
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
  updatesinger({ commit }, delta) {
    commit('singerUpdate', delta);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
