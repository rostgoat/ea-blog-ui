import Home from "../../views/Home.vue";
import Login from "../../views/Login.vue";
import Register from "../../views/Register.vue";
import CreatePost from "../../views/CreatePost.vue";
import ManagePosts from "../../views/ManagePosts.vue";
import ViewPost from "../../views/ViewPost.vue";
import Settings from "../../views/Settings.vue";

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
    name: "create-post",
    component: CreatePost,
    meta: {
      requiresAuth: true
    }
  },
  // {
  //   path: "/manage-posts",
  //   name: "manage-posts",
  //   component: ManagePosts,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  {
    path: "/view/:id",
    name: "view-post",
    component: ViewPost,
    
  }
];
