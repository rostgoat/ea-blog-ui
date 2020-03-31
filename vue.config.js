// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "../ea-blog-api/public"),
  devServer: {
    proxy: process.env.VUE_APP_BASE_URL
  },
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
