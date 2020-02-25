import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import VueSocketIOExt from "vue-socket.io-extended";
import io from "socket.io-client";
// import NestClient from "@/plugins/nest";

async function start() {
  Vue.use(Vuetify);
  Vue.config.productionTip = false;

  const url = "http://localhost:3000";
  const socket = io(url);

  Vue.use(VueSocketIOExt, socket);

  new Vue({
    sockets: {
      connect() {
        this.$socket.client.emit("connected", {
          title: "cod"
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
