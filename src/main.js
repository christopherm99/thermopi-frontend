import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Vuetify from "vuetify";
import App from "./App.vue";
import VueMoment from "vue-moment";

import "vuetify/dist/vuetify.min.css";

Vue.use(VueAxios, axios);
Vue.use(Vuetify);
Vue.use(VueMoment);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
