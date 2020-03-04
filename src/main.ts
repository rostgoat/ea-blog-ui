import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import VueSocketIOExt from "vue-socket.io-extended";
import io from "socket.io-client";
import axios from "axios";

async function start() {
  Vue.use(Vuetify);
  Vue.config.productionTip = false;

  const serverUrl = process.env.VUE_APP_BASE_URL;
  const socket = io(serverUrl);

  Vue.use(VueSocketIOExt, socket);

  axios.defaults.baseURL = serverUrl;

  new Vue({
    sockets: {
      connect() {
        this.$socket.client.emit("connected", {
          title: "Client Connected"
        });
        this.$socket.client.on("connected", (data: string) =>
          console.log(data)
        );
      }
    },
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount("#app");
}

start();
