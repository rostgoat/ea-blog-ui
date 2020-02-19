<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";

@Component({
  components: {
    Login,
    Register
  }
})
export default class App extends Vue {
  name = "App";
  showPassword = false;
  toggleRegister = false;
  toggleLogin = true;
}
</script>
