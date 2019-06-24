import {
  INCREMENT_TARGET,
  DECREMENT_TARGET,
  TOGGLE_HOLD,
  UPDATE_HOLD,
  UPDATE_SENSORS,
  UPDATE_TARGET
} from "./mutation-types";

export default {
  [INCREMENT_TARGET](state) {
    state.target++;
  },
  [DECREMENT_TARGET](state) {
    state.target--;
  },
  [TOGGLE_HOLD](state) {
    state.hold = !state.hold;
  },
  [UPDATE_HOLD](state, hold) {
    state.hold = hold;
  },
  [UPDATE_SENSORS](state, sensors) {
    state.sensors = sensors;
  },
  [UPDATE_TARGET](state, target) {
    state.target = target;
  }
};
