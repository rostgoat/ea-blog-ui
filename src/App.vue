<template>
  <v-app>
    <v-app-bar app dark fixed extended extension-height="3">
      <v-app-bar-nav-icon
        @click.native.stop="sideNav = !sideNav"
        class="hidden-sm-and-up"
      >
      </v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          <v-img :src="imgSrc"></v-img>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          v-for="item in items"
          :key="item.title"
          @click="onClickMenuItem(item.title)"
        >
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-navigation-drawer app clipped temporary absolute v-model="sideNav">
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          @click="onClickMenuItem(item.title)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content class="default-layout__main-content">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { UsersModule } from "@/store/modules/users";
import { Watch } from "vue-property-decorator";
import { Route } from "vue-router";

@Component
export default class App extends Vue {
  name = "App";
  loading = false;
  items = [
    { icon: "mdi-lead-pencil", title: "Create Post" },
    { icon: "mdi-book-open", title: "Manage Posts" },
    { icon: "mdi-lock-open", title: "Login" },
    { icon: "mdi-lock", title: "Logout" }
  ];

  user = {};
  sideNav = false;

  /**
   * Get user from state
   */
  get loggedInUser() {
    return UsersModule.GET_USER;
  }

  /**
   * Load image from post
   */
  get imgSrc() {
    return require("../public/logo_gb.png");
  }

  mounted() {
    this.updateMenuLinks();
  }

  /**
   * Navigation guard that keeps track of data before this route is entered
   *
   * Todo.. figure out wtf is wrong with this
   */
  beforeRouteEnter(to: Route, from: Route, next: any) {
    next((vm: any) => {
      // console.log("vm.UsersModule.loggedInUser: ", vm.UsersModule.loggedInUser);
      vm.UsersModule.loggedInUser;
      next();
    });
  }

  /**
   * Watcher for the user state changes and update nav links
   */
  @Watch("loggedInUser")
  onLoggedInUserChange() {
    this.updateMenuLinks();
  }

  /**
   * Update nav bar links depending on user state
   */
  updateMenuLinks() {
    const loggedIn = UsersModule.GET_USER.token;

    if (loggedIn) {
      this.items = [];
      this.items.unshift(
        { icon: "mdi-lead-pencil", title: "Create Post" },
        { icon: "mdi-book-open", title: "Manage Posts" },
        { icon: "mdi-lock", title: "Logout" }
      );
    } else {
      this.items = [];
      this.items.push({ icon: "mdi-lock-open", title: "Login" });
    }
  }

  /**
   * Event handler for clicking nav bar items
   */
  onClickMenuItem(item: string) {
    const route = item.toLowerCase().replace(/ /g, "-");

    switch (route) {
      case "login":
        this.onClickLogin();
        break;
      case "logout":
        this.onClickLogout();
        break;
      case "create-post":
        this.onClickCreatePost();
        break;
      case "manage-posts":
        this.onClickManagePosts();
        break;
      case "settings":
        this.onClickSettings();
        break;
    }
  }

  /**
   * Click event when user clicks login
   */
  onClickLogin() {
    this.$router.push("/login");
  }

  /**
   * Click event when user clicks logout
   */
  onClickLogout() {
    UsersModule.LOGOUT_USER();
    if (this.$route.name !== "login") {
      this.$router.push("/login");
    }
  }

  /**
   * Click event when user clicks manage posts
   */
  onClickManagePosts() {
    this.$router.push("/manage-posts");
  }

  /**
   * Click event when user clicks settings
   */
  onClickSettings() {
    this.$router.push("/settings");
  }

  /**
   * Click event when user clicks create posts
   */
  onClickCreatePost() {
    this.$router.push("/create");
  }
}
</script>
<style lang="scss">
.default-layout {
  &__main-content {
    transition: map-get($transitions, fade);
  }
}

.nav-user {
  font-size: 1rem;
}

.v-btn {
  letter-spacing: 0.3px !important;
  font-weight: 400 !important;

  &__content {
    // font-size: 1.2rem !important;
  }
}
</style>
