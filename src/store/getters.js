export default {
  average(state) {
    let tot = 0;
    for (let i = 0; i < state.sensors.length; i++) {
      tot += state.sensors[i].value;
    }
    return Math.round(tot / state.sensors.length);
  }
};
