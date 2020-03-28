// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
const DEBUG = process.env.NODE_ENV !== "production";
console.log("process.env.NODE_ENV config- ", process.env.NODE_ENV);
module.exports = {
  outputDir: path.resolve(__dirname, "../ea-blog-api/public"),
  devServer: {
    proxy: DEBUG ? "http://localhost:3000" : "https://game-bible.herokuapp.com"
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
