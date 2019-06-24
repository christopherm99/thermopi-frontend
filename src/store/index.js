import Vue from "vue";
import Vuex from "vuex";

import state from "./state"; // Default Vuex state
import mutations from "./mutations"; // Mutation definitions, only used internally by actions.
import actions from "./actions"; // Action definitions, called externally in components (include axios requests)
import getters from "./getters"; // Getter definitions, just contains average sensor temp function

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  strict: process.env.NODE_ENV !== "production"
});
