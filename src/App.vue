<template>
  <v-app>
    <v-app-bar app dark>
      <v-toolbar-title>EA Games Blog</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon @click="loginOrRegister">mdi-account-circle</v-icon>
    </v-app-bar>
    <v-content>
      <router-view />
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
