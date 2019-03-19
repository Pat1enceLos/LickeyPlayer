import fs from 'fs';
import path from 'path';

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
      this.$store.dispatch('updateTitle', basename.slice(0, basename.lastIndexOf('.')));
      console.log(files);
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
