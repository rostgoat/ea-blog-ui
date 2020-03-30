import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
Vue.use(Vuex);

const vuexPersist = new VuexPersistence<any>({
  strictMode: process.env.NODE_ENV !== 'production' ? true : false, // This **MUST** be set to true
  storage: localStorage,
})

export default new Vuex.Store({
  state: {},
  mutations: {
    RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION
  },
  actions: {},
  modules: {},
  plugins: [vuexPersist.plugin]
});
