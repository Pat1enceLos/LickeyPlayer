const state = {
  loginUser: '',
};

const getters = {
  isLogin: state => state.loginUser !== '',
  loginUser: state => state.loginUser,
};

const mutations = {
  loginUserUpdate(state, payload) {
    console.log(payload);
    state.loginUser = payload;
  },
};

const actions = {
  updateLoginUser({ commit }, delta) {
    commit('loginUserUpdate', delta);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
