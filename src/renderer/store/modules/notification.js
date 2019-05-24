const state = {
  notifications: [],
};

const getters = {
  notifications: state => state.notifications,
};

const mutations = {
  addNotifications(state, payload) {
    if (payload.content !== '文件正在导出到Music中' || state.notifications.findIndex(i => i.content === '文件正在导出到Music中') === -1) {
      if (state.notifications.length === 3) {
        state.notifications.splice(0, 1);
      }
      state.notifications.push(payload);
    }
  },
  removeNotifications(state, id) {
    state.notifications = state.notifications.filter(m => m.id !== id);
  },
  exportNotificationRemove(state) {
    const index = state.notifications.findIndex(i => i.content === '文件正在导出到Music中');
    if (index !== -1) {
      state.notifications.splice(index, 1);
    }
  },
};
let i = 0;
const actions = {
  removeNotifications({ commit }, id) {
    commit('removeNotifications', id);
  },
  removeExportNotification({ commit }) {
    commit('exportNotificationRemove');
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
        commit('removeNotifications', id);
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
