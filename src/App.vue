<template>
  <v-app class="default-layout">
    <v-app-bar app dark class="default-layout__navbar">
      <v-toolbar-title>EA Games Blog</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="username">Create Post</v-btn>
      <v-menu bottom class="menu">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="onClickMenuItem(item.title)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
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

@Component
export default class App extends Vue {
  name = "App";

  items = [{ title: "Login" }, { title: "Register" }, { title: "My Account" }];

  get username() {
    return UsersModule.userUsername;
  }

  @Watch("items")
  onUserLogin() {
    this.items.filter(item => {
      if (item.title === "Login") {
        item.title = "Logout";
      }
    });
  }

  onClickMenuItem(item: string) {
    this.$router.push(item.toLowerCase());
  }
}
</script>
<style lang="scss">
@import "assets/styles/index.scss";
.default-layout {
  &__main-content {
    transition: map-get($transitions, fade);
  }
}
</style>
