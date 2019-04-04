import * as mm from 'music-metadata';

const state = {
  src: '',
  audioInfo: [],
  duration: 0,
  currentTime: 0,
  paused: true,
  volume: 25,
  lastVolume: 0,
  playlistQueue: [], // 播放队列
  cycleType: '',
  musicLibraryPlaylist: [], // 音乐库列表
  displayType: true, // 图片和列表切换
  createdPlaylist: [], // 所有创建的playlist的信息
  randomPlay: false, // 随机播放
  currentPlaylistPlay: '', // 当前播放的列表的名称
  currentPlaylistShow: 'musicLibrary', // 当前显示的列表的名称
};

const getters = {
  src: state => state.src,
  duration: state => state.duration,
  currentTime: state => state.currentTime,
  paused: state => state.paused,
  volume: state => state.volume,
  lastVolume: state => state.lastVolume,
  playlistQueue: state => state.playlistQueue,
  currentPlaylistQueue: state => state.playlistQueue, // TODO define current Playlist
  randomPlay: state => state.randomPlay,
  cycleType: state => state.cycleType,
  nextAudio: (state, getters) => {
    let list = [];
    if (getters.currentPlaylistPlay === 'playlistQueue') {
      list = list.concat(state.playlistQueue);
    } else if (getters.currentPlaylistPlay === 'musicLibrary') {
      list = list.concat(state.musicLibraryPlaylist);
    } else {
      getters.createdPlaylist.forEach((item) => {
        if (item.name === getters.currentPlaylistPlay) {
          list = list.concat(item.src);
        }
      });
    }
    const index = list.findIndex(value => value === getters.src);
    if (getters.randomPlay) {
      list.splice(index, 1);
      return list[Math.floor(Math.random() * Math.floor(list.length))];
    }
    if (getters.cycleType === '') {
      if (index !== -1 && index + 1 < list.length) {
        return list[index + 1];
      } else if (index + 1 >= list.length) {
        return '';
      }
    } else if (getters.cycleType === 'single') {
      return list[index];
    } else if (getters.cycleType === 'playlist') {
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
    if (getters.currentPlaylistPlay === 'playlistQueue') {
      list = state.playlistQueue;
    } else if (getters.currentPlaylistPlay === 'musicLibrary') {
      list = state.musicLibraryPlaylist;
    } else {
      getters.createdPlaylist.forEach((item) => {
        if (item.name === getters.currentPlaylistPlay) {
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
  musicLibraryPlaylist: state => state.musicLibraryPlaylist,
  displayType: state => state.displayType,
  createdPlaylist: state => state.createdPlaylist,
  audioInfo: state => state.audioInfo,
  currentAudioInfo: (state, getters) => state.audioInfo.find(item => item.src === getters.src),
  currentPlaylistPlay: state => state.currentPlaylistPlay,
  currentPlaylistShow: state => state.currentPlaylistShow,
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
  musicLibraryPlaylistUpdate(state, payload) {
    payload.forEach((item) => {
      if (!state.musicLibraryPlaylist.includes(item)) {
        state.musicLibraryPlaylist.unshift(item);
      }
    });
  },
  musicFromQueueRemove(state, payload) {
    state.playlistQueue.splice(state.playlistQueue.indexOf(payload), 1);
  },
  musicFromLibraryRemove(state, payload) {
    state.musicLibraryPlaylist.splice(state.musicLibraryPlaylist.indexOf(payload), 1);
  },
  musicFromPlaylistRemove(state, payload) {
    state.createdPlaylist.forEach((item) => {
      if (item.name === payload.name) {
        item.src.splice(item.src.indexOf(payload.src), 1);
      }
    });
  },
  displayTypeUpdate(state) {
    state.displayType = !state.displayType;
  },
  createdPlaylistUpdate(state, payload) {
    state.createdPlaylist.push({ name: payload, src: [] });
  },
  musicAddToPlaylist(state, payload) { // 拖动音乐添加
    const playlistName = payload[0].name ? payload[0].name : state.currentPlaylistShow;
    state.createdPlaylist.forEach((item) => {
      if (item.name === playlistName) {
        payload.forEach((i) => {
          if (!item.src.includes(i.src)) {
            item.src.unshift(i.src);
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
  cycleTypeUpdate(state, payload) {
    state.cycleType = payload;
  },
  randomPlayUpdate(state, payload) {
    state.randomPlay = payload;
  },
  currentPlaylistPlayUpdate(state, payload) {
    state.currentPlaylistPlay = payload;
  },
  currentPlaylistShowUpdate(state, payload) {
    state.currentPlaylistShow = payload;
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
  updateMusicLibraryPlaylist({ commit }, delta) {
    commit('musicLibraryPlaylistUpdate', delta);
  },
  removeMusicFromQueue({ commit }, delta) {
    commit('musicFromQueueRemove', delta);
  },
  removeMusicFromLibrary({ commit }, delta) {
    commit('musicFromLibraryRemove', delta);
  },
  removeMusicFromPlaylist({ commit }, delta) {
    commit('musicFromPlaylistRemove', delta);
  },
  updateDisplayType({ commit }) {
    commit('displayTypeUpdate');
  },
  updateCreatedPlaylist({ commit }, delta) {
    commit('createdPlaylistUpdate', delta);
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
  updateCycleType({ commit }, delta) {
    commit('cycleTypeUpdate', delta);
  },
  updateRandomPlay({ commit }, delta) {
    commit('randomPlayUpdate', delta);
  },
  updateCurrentPlaylistPlay({ commit }, delta) {
    commit('currentPlaylistPlayUpdate', delta);
  },
  updateCurrentPlaylistShow({ commit }, delta) {
    commit('currentPlaylistShowUpdate', delta);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
