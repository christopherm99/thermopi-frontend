import Vue from "vue";
import Vuex from "vuex";

import axios from "axios";

import {
  INCREMENT_TARGET,
  DECREMENT_TARGET,
  TOGGLE_HOLD,
  UPDATE_HOLD,
  UPDATE_SENSORS,
  UPDATE_TARGET
} from "./mutation-types";

Vue.use(Vuex);

const server = "http://localhost:8080";

export default new Vuex.Store({
  state: {
    sensors: [],
    hold: false,
    target: 0
  },
  mutations: {
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
  },
  actions: {
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
  },
  getters: {
    average(state) {
      let tot = 0;
      for (let i = 0; i < state.sensors.length; i++) {
        tot += state.sensors[i].value;
      }
      state.average = Math.round(tot / state.sensors.length);
    }
  },
  strict: process.env.NODE_ENV !== "production"
});
