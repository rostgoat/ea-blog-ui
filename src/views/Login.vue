<template>
  <v-app>
    <v-card width="400" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1">Login</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            label="Username"
            v-model="loginUsername"
            prepend-icon="mdi-account-circle"
          ></v-text-field>
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            v-model="loginPassword"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="success" @click="onClickRegister">Register</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="info" @click="onClickLogin">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Login extends Vue {
  name = "Login";
  showPassword = false;

  loginUsername = null;
  loginPassword = null;

  @Prop() toggleLogin!: boolean;

  onClickLogin() {
    const userToLogin = {
      username: this.loginUsername,
      password: this.loginPassword
    };

    this.$socket.client.emit("msgToServer", {
      title: "cod"
    });
    console.log("userToLogin", userToLogin);
  }

  onClickRegister() {
    this.$router.push("register");
  }
}
</script>
