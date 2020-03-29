import Vue from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
/* eslint-disable */

Vue.component("font-awesome-icon", FontAwesomeIcon);

library.add(faUserSecret);
export const eventBus = new Vue();

Vue.config.productionTip = false;
new Vue({
  render: h => h(App)
}).$mount("#app");
