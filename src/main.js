import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import BootstrapVue3 from "bootstrap-vue-3";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import "@/assets/scss/style.scss";

import AppLink from "@/components/AppLink.vue";

import store from "./store";

import axios from "axios";
import VueAxios from "vue-axios";

const app = createApp(App);
app.component("AppLink", AppLink);
app.use(router);
app.use(store);
app.use(VueAxios, axios);
app.use(BootstrapVue3);
app.mount("#app");
