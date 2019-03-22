import manifest from '../../package.json';

let validAudioExtensions;
export function getValidAudioExtensions() {
  if (validAudioExtensions) return validAudioExtensions;
  validAudioExtensions = manifest.build[process.platform === 'darwin' ? 'mac' : 'win']
    .fileAssociations.reduce((exts, fa) => exts.concat(fa.ext), []);
  return validAudioExtensions;
}

let validAudioRegex;
export function getValidAudioRegex() {
  if (validAudioRegex) return validAudioRegex;
  validAudioRegex = new RegExp(`\\.(${getValidAudioExtensions().join('|')})$`, 'i');
  return validAudioRegex;
}

export default {
  getValidAudioExtensions,
  getValidAudioRegex,
};
