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
  // Refreshes sensor list, temp hold status, and target temperature from server
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
  // Commits increment mutation and POSTS new target temperature to server
  incrementTarget({ commit, state }) {
    commit(INCREMENT_TARGET);
    axios.post(server + "/target", {
      value: state.target,
      persistent: false
    });
  },
  // Commits decrement mutation and POSTs new target temperature to server
  decrementTarget({ commit, state }) {
    commit(DECREMENT_TARGET);
    axios.post(server + "/target", {
      value: state.target,
      persistent: false
    });
  },
  // Commits toggle mutation and POSTs new hold status to server
  toggleHold({ commit, state }) {
    commit(TOGGLE_HOLD);
    axios.post(server + "/settings/hold", {
      hold: state.hold
    });
  }
};
