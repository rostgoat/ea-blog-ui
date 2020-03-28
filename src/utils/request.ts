import axios from "axios";
import { Message } from "element-ui";
import logger from "@/plugins/logger";
import { UsersModule } from "@/store/modules/users";

const DEBUG = process.env.NODE_ENV !== "production";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000,
});

// Request interceptors
service.interceptors.request.use(
  config => {

    // TODO: gotta read on what to actually put here once heroku is working
    // Add X-Access-Token header to every request, you can add other custom headers here
    // if (UsersModule.token) {
    //   config.headers["X-Access-Token"] = UsersModule.token;
    // }

    if (DEBUG) {
      logger.request({
        method: config.method,
        url: config.url
      });
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptors
service.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    const { response } = error;

    if (DEBUG) {
      logger.error(response.data.message, response);
    }

    Message({
      message: `Error: ${response.data.message}`,
      type: "error",
      duration: 5 * 1000
    });

    return Promise.reject({ ...error });
  }
);

export default service;
