<template>
  <v-app>
    <v-card width="400" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1">Register</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            label="Name"
            v-model="registerName"
            prepend-icon="mdi-account-circle"
          ></v-text-field>
          <v-text-field
            label="Username"
            v-model="registerUsername"
            prepend-icon="mdi-account-circle"
          ></v-text-field>
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            v-model="registerPassword"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            label="Confirm Password"
            v-model="registerPasswordConfirm"
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
export default class Register extends Vue {
  name = "Register";
  showPassword = false;

  @Prop() toggleRegister!: boolean;

  registerName = null;
  registerUsername = null;
  registerPassword = null;
  registerPasswordConfirm = null;

  onClickRegister() {
    const userToRegister = {
      name: this.registerName,
      username: this.registerUsername,
      password: this.registerPassword,
      passwordConfirm: this.registerPasswordConfirm
    };

    console.log("userToRegister", userToRegister);
  }

  onClickLogin() {
    console.log("ok wtf");
    this.$emit("toggleLogin", true);
  }
}
</script>
