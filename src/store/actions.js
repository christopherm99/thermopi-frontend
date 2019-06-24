import axios from "axios";

import {
  INCREMENT_TARGET,
  DECREMENT_TARGET,
  TOGGLE_HOLD,
  UPDATE_HOLD,
  UPDATE_SENSORS,
  UPDATE_TARGET
} from "./mutation-types";

const server = "http://localhost:8080";

export default {
  refresh({ commit }) {
    axios.get(server + "/sensors").then(response => {
      commit(UPDATE_SENSORS, response.data);
    });
    axios.get(server + "/settings/hold").then(response => {
      commit(UPDATE_HOLD, response.data.hold);
    });
    axios.get(server + "/target").then(response => {
      commit(UPDATE_TARGET, response.data.value);
    });
  },
  incrementTarget({ commit, state }) {
    commit(INCREMENT_TARGET);
    axios.post(server + "/target", {
      value: state.target,
      persistent: false
    });
  },
  decrementTarget({ commit, state }) {
    commit(DECREMENT_TARGET);
    axios.post(server + "/target", {
      value: state.target,
      persistent: false
    });
  },
  toggleHold({ commit, state }) {
    commit(TOGGLE_HOLD);
    axios.post(server + "/settings/hold", {
      hold: state.hold
    });
  }
};
