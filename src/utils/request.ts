import axios from "axios";
import { UsersModule } from "@/store/modules/users";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000
});

// Request interceptors
service.interceptors.request.use(
  config => {
    // Add X-Access-Token header to every request, you can add other custom headers here
    if (UsersModule.token) {
      config.headers["X-Access-Token"] = UsersModule.token;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// // Response interceptors
// service.interceptors.response.use(
//   response => {
//     const res = response.data;
//     if (res.code !== 20000) {
//       window.alert({
//         message: res.message || "Error",
//         type: "error",
//         duration: 5 * 1000
//       });

//       return Promise.reject(new Error(res.message || "Error"));
//     } else {
//       return response.data;
//     }
//   },
//   error => {
//     window.alert({
//       message: error.message,
//       type: "error",
//       duration: 5 * 1000
//     });
//     return Promise.reject(error);
//   }
// );

export default service;
