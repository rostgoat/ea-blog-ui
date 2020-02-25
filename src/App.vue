<template>
  <v-app class="default-layout">
    <v-app-bar app dark class="default-layout__navbar">
      <v-toolbar-title>EA Games Blog</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon @click="loginOrRegister">mdi-account-circle</v-icon>
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

@Component
export default class App extends Vue {
  name = "App";

  loginOrRegister() {
    this.$router.push("login");
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
