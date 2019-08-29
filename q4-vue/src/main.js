import Vue from "vue";
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import Paginate from 'vuejs-paginate';

import BootstrapVue from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.component('paginate', Paginate)

Vue.use(BootstrapVue);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
