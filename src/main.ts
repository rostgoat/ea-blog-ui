import Vue from "vue";
import App from "./App.vue";
import CustomRouter from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import logger from "./plugins/logger";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import VueSocketIOExt from "vue-socket.io-extended";
import io from "socket.io-client";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

async function start() {
  console.log('process.env.VUE_APP_BASE_URL', process.env.VUE_APP_BASE_URL)
  const router = new CustomRouter().initialize();
  const serverUrl = process.env.VUE_APP_BASE_URL;
  const socket = io(serverUrl);

  Vue.config.productionTip = false;

  Vue.use(VueSocketIOExt, socket);
  Vue.use(ElementUI);
  Vue.use(Vuetify);
  Vue.use(CustomRouter);
  Vue.use(logger);

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
