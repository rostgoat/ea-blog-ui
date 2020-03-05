import Home from "../../views/Home.vue";
import Login from "../../views/Login.vue";
import Register from "../../views/Register.vue";
import CreatePost from "../../views/CreatePost.vue";

export default [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/create",
    name: "CreatePost",
    component: CreatePost,
    meta: {
      requiresAuth: true
    }
  }
];
