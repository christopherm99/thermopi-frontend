import Vue from "vue";
import VueMoment from "vue-moment";
import Buefy from "buefy";
import "buefy/dist/buefy.css";

import App from "./App.vue";
import store from "./store";

Vue.use(Buefy, {
  defaultIconPack: "fas"
});

Vue.use(VueMoment);

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
