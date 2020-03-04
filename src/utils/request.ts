import axios from "axios";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000
});

// // Request interceptors
// service.interceptors.request.use(
//   config => {
//     // Add X-Access-Token header to every request, you can add other custom headers here
//     console.log("UsersModule.token", UsersModule.token);
//     if (UsersModule.token) {
//       config.headers["X-Access-Token"] = UsersModule.token;
//     }
//     return config;
//   },
//   error => {
//     Promise.reject(error);
//   }
// );

// // Response interceptors
service.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    console.log(error);
    console.error(error);
    return Promise.reject(error);
  }
);

export default service;
