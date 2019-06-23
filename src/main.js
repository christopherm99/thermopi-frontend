import Vue from "vue";
import VueMoment from "vue-moment";
import Buefy from "buefy";
import "buefy/dist/buefy.css";

import App from "./App.vue";

Vue.use(Buefy, {
  defaultIconPack: "fas"
});

Vue.use(VueMoment);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
