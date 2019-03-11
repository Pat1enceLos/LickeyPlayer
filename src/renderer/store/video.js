
const videodata = {
  tick: 0,
  /*
   * The onTick MUST BE use to compute the UI states.
   * When the video is playing the ontick is triggered by ontimeupdate of Video tag,
   * else it is triggered by setInterval.
  */

  onTick: () => {},
  set time(val) {
    this.tick = val;
    this.onTick();
  },
  get time() { return this.tick; },
};

// eslint-disable-next-line import/prefer-default-export
export { videodata };
