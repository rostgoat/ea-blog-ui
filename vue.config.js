module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "~@/styles/_variables.scss";
          @import "~@/styles/_transitions.scss";
          @import "~@/styles/_mixins.scss";
          @import "~@/styles/_setup.scss";
          @import "~@/styles/_normalize.scss";
        `
      }
    }
  },
  transpileDependencies: ["vuetify", "vuex-module-decorators", "vuex-persist"]
};
