import fs from 'fs';
import path from 'path';
import { getValidAudioRegex } from '../../shared/util';

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
    openFiles(...files) {
      const basename = path.basename(files[0]);
      this.$store.dispatch('updateSrc', files[0]);
      this.$store.dispatch('updatePlaylistQueue', files);
      this.$store.dispatch('updateTitle', basename.slice(0, basename.lastIndexOf('.')));
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
