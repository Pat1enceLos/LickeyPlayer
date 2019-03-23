import fs from 'fs';
import path from 'path';
import { remote } from 'electron';
import { getValidAudioRegex, getValidAudioExtensions } from '../../shared/util';

export default {
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
            this.openFolders(...files);
          } else {
            this.openFiles(...files);
          }
        }
      });
    },
    openFiles(...files) {
      const validFiles = files.filter(file => getValidAudioRegex().test(path.extname(file)));
      if (validFiles.length) {
        const basename = path.basename(validFiles[0]);
        this.$store.dispatch('updateSrc', validFiles[0]);
        this.$store.dispatch('updatePlaylistQueue', validFiles);
        this.$store.dispatch('updateTitle', basename.slice(0, basename.lastIndexOf('.')));
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
  },
};
