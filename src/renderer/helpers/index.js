import fs, { closeSync, open, readdir, readSync } from 'fs';
import path, { basename, dirname, extname, join } from 'path';
import { remote } from 'electron';
import { mapGetters } from 'vuex';
import { getValidAudioRegex, getValidAudioExtensions } from '../../shared/util';

export default {
  computed: {
    ...mapGetters(['currentPlaylistShow']),
  },
  methods: {
    timeFormatter(s) {
      const dt = new Date(Math.abs(s) * 1000);
      let hours = dt.getUTCHours();
      let minutes = dt.getUTCMinutes();
      let seconds = dt.getUTCSeconds();

      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
      if (hours > 0) {
        if (hours < 10) {
          hours = `${hours}`;
        }
        return `${hours}:${minutes}:${seconds}`;
      }
      return `${minutes}:${seconds}`;
    },
    openFilesByDialog({ defaultPath } = {}) {
      if (this.showingPopupDialog) return;
      this.showingPopupDialog = true;
      const opts = ['openFile', 'multiSelections'];
      if (process.platform === 'darwin') {
        opts.push('openDirectory');
      }
      process.env.NODE_ENV === 'testing' ? '' : remote.dialog.showOpenDialog({
        title: 'Open Dialog',
        defaultPath,
        filters: [{
          name: 'Audio Files',
          extensions: getValidAudioExtensions(),
        }, {
          name: 'All Files',
          extensions: ['*'],
        }],
        properties: opts,
        securityScopedBookmarks: process.mas,
      }, (files) => {
        this.showingPopupDialog = false;
        if (files) {
          // if selected files contain folders only, then call openFolder()
          const onlyFolders = files.every(file => fs.statSync(file).isDirectory());
          files.forEach(file => remote.app.addRecentDocument(file));
          if (onlyFolders) {
            this.importFolders(...files);
          } else {
            this.importFiles(...files);
          }
        }
      });
    },
    importFolders(...folders) {
      const files = [];
      const AudioFiles = [];

      folders.forEach((dirPath) => {
        if (fs.statSync(dirPath).isDirectory()) {
          const dirFiles = fs.readdirSync(dirPath).map(file => path.join(dirPath, file));
          files.push(...dirFiles);
        }
      });

      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];
        if (!path.basename(file).startsWith('.')) {
          if (getValidAudioRegex().test(path.extname(file))) {
            AudioFiles.push(file);
          }
        }
      }
      if (AudioFiles.length !== 0) {
        this.importFiles(...AudioFiles);
      } else {
        // TODO: no AudioFiles in folders error catch
        alert('不支持的音乐格式');
      }
    },
    importFiles(...files) {
      const validFiles = files.filter(file => getValidAudioRegex().test(path.extname(file)));
      if (validFiles.length) {
        this.$store.dispatch('updateMusicLibraryPlaylist', validFiles);
        this.$store.dispatch('updateAudioInfo', validFiles);
        if (!['musicLibrary', 'playlistQueue'].includes(this.currentPlaylistShow)) {
          this.$store.dispatch('addMusicToPlaylist', validFiles);
        } else {
          this.$store.dispatch('updateCurrentPlaylistShow', 'musicLibrary');
        }
      } else {
        alert('暂不支持的音乐格式');
      }
    },
    openFiles(...files) {
      const validFiles = files.filter(file => getValidAudioRegex().test(path.extname(file)));
      if (validFiles.length) {
        this.$store.dispatch('updateSrc', validFiles[0]); // 拖到播放列表直接播放时
        this.$store.dispatch('updatePlaylistQueue', validFiles);
        this.$store.dispatch('updateMusicLibraryPlaylist', validFiles);
        this.$store.dispatch('updateCurrentPlaylistShow', 'playlistQueue');
        this.$store.dispatch('updateCurrentPlaylistPlay', 'playlistQueue');
        this.$store.dispatch('updateAudioInfo', validFiles);
      } else {
        alert('暂不支持的音乐格式');
      }
    },
    openFolders(...folders) {
      const files = [];
      const AudioFiles = [];

      folders.forEach((dirPath) => {
        if (fs.statSync(dirPath).isDirectory()) {
          const dirFiles = fs.readdirSync(dirPath).map(file => path.join(dirPath, file));
          files.push(...dirFiles);
        }
      });

      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];
        if (!path.basename(file).startsWith('.')) {
          if (getValidAudioRegex().test(path.extname(file))) {
            AudioFiles.push(file);
          }
        }
      }
      if (AudioFiles.length !== 0) {
        this.openFiles(...AudioFiles);
      } else {
        // TODO: no AudioFiles in folders error catch
        alert('不支持的音乐格式');
      }
    },
    filePathToUrl(filePath) {
      if (!filePath) return '';
      let fileUrl = filePath.replace(/\\/g, '/');
      if (!fileUrl.startsWith('/')) {
        fileUrl = `/${fileUrl}`;
      }
      fileUrl = encodeURI(`file://${fileUrl}`)
        .replace(/#/g, '%23')
        .replace(/[?]/g, '%3F');
      return fileUrl;
    },
    searchForLocalList(audioSrc) {
      return new Promise((resolve, reject) => {
        const audioDir = dirname(audioSrc);
        const audioBasename = basename(audioSrc, extname(audioSrc)).toLowerCase();
        const audioFilename = basename(audioSrc).toLowerCase();
        const extensionRegex = new RegExp('\\.lrc$', 'i');
        readdir(audioDir, (err, files) => {
          if (err) reject(err);
          resolve(files.filter((lyricFilename) => {
            const lowerCasedName = lyricFilename.toLowerCase();
            return (
              extensionRegex.test(lowerCasedName) &&
              lowerCasedName.slice(0, lowerCasedName.lastIndexOf('.')) === audioBasename &&
              lowerCasedName !== audioFilename
            );
          })
            .map(lyricFilename => (join(audioDir, lyricFilename))));
        });
      });
    },
    getFragmentBuffer(path) {
      return new Promise((resolve, reject) => {
        const size = 4096;
        open(path, 'r', (err, fd) => {
          if (err) reject(err);
          const pos = 0;
          const buf = Buffer.alloc(size);
          readSync(fd, buf, 0, size, pos);
          resolve(buf);
          closeSync(fd);
        });
      });
    },
  },
};
