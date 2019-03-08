const state = {
  windowSize: [0, 0],
  windowMinimumSize: [0, 0],
  windowPosition: [0, 0],
  isFullScreen: false,
  isFocused: true,
  isMaximized: false,
  isMinimized: false,
};

const getters = {
  winWidth: state => state.windowSize[0],
  winHeight: state => state.windowSize[1],
  winSize: state => state.windowSize,
  winRatio: state => state.windowSize[0] / state.windowSize[1],
  winPosX: state => state.windowPosition[0],
  winPosY: state => state.windowPosition[1],
  winPos: state => state.windowPosition,
  isFullScreen: state => state.isFullScreen,
  isFocused: state => state.isFocused,
  isMaximized: state => state.isMaximized,
  isMinimized: state => state.isMinimized,
};

const mutations = {
  windowSize(state, payload) {
    state.windowSize = payload;
  },
  windowPosition(state, payload) {
    state.windowPosition = payload;
  },
  isFullScreen(state, payload) {
    state.isFullScreen = payload;
  },
  isFocused(state, payload) {
    state.isFocused = payload;
  },
  isMaximized(state, payload) {
    state.isMaximized = payload;
  },
  isMinimized(state, payload) {
    state.isMinimized = payload;
  },
};

const actions = {
  windowSize({ commit }, payload) {
    commit('windowSize', payload);
  },
  windowPosition({ commit }, payload) {
    commit('windowPosition', payload);
  },
  isFullScreen({ commit }, payload) {
    commit('isFullScreen', payload);
  },
  isFocused({ commit }, payload) {
    commit('isFocused', payload);
  },
  isMaximized({ commit }, payload) {
    commit('isMaximized', payload);
  },
  isMinimized({ commit }, payload) {
    commit('isMinimized', payload);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
