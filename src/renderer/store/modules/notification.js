const state = {
  notifications: [],
};

const getters = {
  notifications: state => state.notifications,
};

const mutations = {
  addNotifications(state, payload) {
    if (state.notifications.length === 3) {
      state.notifications.splice(0, 1);
    }
    state.notifications.push(payload);
  },
  removeNotifications(state, id) {
    state.notifications = state.notifications.filter(m => m.id !== id);
  },
};
let i = 0;
const actions = {
  removeNotifications({ commit }, id) {
    commit('removeNotifications', id);
  },
  addNotifications({ commit }, {
    content, dismissAfter,
  }) {
    i += 1;
    const id = i;
    commit('addNotifications', {
      id, content, dismissAfter,
    });
    if (dismissAfter) {
      setTimeout(() => {
        commit('removeMessages', id);
      }, dismissAfter);
    }
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
