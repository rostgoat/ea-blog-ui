module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "~@/assets/styles/_variables.scss";
          @import "~@/assets/styles/_transitions.scss";
        `
      }
    }
  },
  transpileDependencies: ["vuetify"]
};
