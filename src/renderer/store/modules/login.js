import nickname from 'nickname';

const state = {
  loginUser: '',
  name: nickname.random(),
  birth: new Date(),
  gender: '其他',
  description: '这个人很懒，什么都没有留下。。',
  userImg: '',
};

const getters = {
  isLogin: state => state.loginUser !== '',
  loginUser: state => state.loginUser,
  birth: state => state.birth,
  gender: state => state.gender,
  description: state => state.description,
  name: state => state.name,
  userImg: state => state.userImg,
};

const mutations = {
  loginUserUpdate(state, payload) {
    state.loginUser = payload;
  },
  birthUpdate(state, payload) {
    state.birth = payload;
  },
  genderUpdate(state, payload) {
    state.gender = payload;
  },
  descriptionUpdate(state, payload) {
    state.description = payload;
  },
  nameUpdate(state, payload) {
    state.name = payload;
  },
  userImgUpdate(state, payload) {
    state.userImg = payload;
  },
};

const actions = {
  updateLoginUser({ commit }, delta) {
    commit('loginUserUpdate', delta);
  },
  updateBirth({ commit }, delta) {
    commit('birthUpdate', delta);
  },
  updateGender({ commit }, delta) {
    commit('genderUpdate', delta);
  },
  updateDescription({ commit }, delta) {
    commit('descriptionUpdate', delta);
  },
  updateName({ commit }, delta) {
    commit('nameUpdate', delta);
  },
  updateUserImg({ commit }, delta) {
    commit('userImgUpdate', delta);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
