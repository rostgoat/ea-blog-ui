import VueRouter from "vue-router";

import routes from "./routes/index";
import { UsersModule } from "@/store/modules/users";

export default class CustomRouter extends VueRouter {
  constructor() {
    super({
      mode: "history",
      routes
    });
  }

  /**
   * Initialize the router.
   * @returns {Object} this
   */
  initialize() {
    this.initBeforeEach();
    // this.initAfterEach();
    return this;
  }

  /**
   * Iniitializes rules run before a route is loaded.
   * Good for authentication and authorization enforcement.
   */
  initBeforeEach() {
    this.beforeEach(async (to, from, next) => {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        if (UsersModule.loggedInUser.token === "") {
          next({
            path: "/login",
            params: { nextUrl: to.fullPath }
          });
        }
      }

      return next();
    });
  }

  /**
   * Override to hide duplicate-navigation errors on production.
   * @override
   * @param {Object} location
   */
  push(location: string) {
    try {
      return super.push(location);
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(e);
      }
      throw e;
    }
  }

  /**
   * Override to hide duplicate-navigation errors on production.
   * @override
   * @param {Object} location
   */
  replace(location: string) {
    try {
      return super.replace(location);
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(e);
      }
      throw e;
    }
  }
}
