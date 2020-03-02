<template>
  <v-app class="register-container">
    <div class="registration-alert">
      <ToastManager :toast="registrationToast" />
    </div>
    <v-card width="400" class="mx-auto mt-5 register-card">
      <v-card-title>
        <h1 class="display-1">Register</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            label="Name"
            v-model="registrationForm.name"
            prepend-icon="mdi-account-circle"
          ></v-text-field>
          <v-text-field
            label="Username"
            :rules="usernameRules"
            v-model="registrationForm.username"
            prepend-icon="mdi-account-circle"
          ></v-text-field>
          <v-text-field
            label="Email"
            :rules="emailRules"
            v-model="registrationForm.email"
            prepend-icon="mdi-account-circle"
          ></v-text-field>
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            :rules="passwordRules"
            v-model="registrationForm.password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            :rules="passwordConfirmRules"
            label="Confirm Password"
            v-model="registrationForm.passwordConfirm"
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
import { emailRegex, passwordRegex, usernameRegex } from "@/utils/validators";
import axios from "axios";

import ToastManager from "@/components/ToastManager.vue";
@Component({
  components: { ToastManager }
})
export default class Register extends Vue {
  name = "Register";
  showPassword = false;

  @Prop() toggleRegister!: boolean;
  show = false;
  emailRules = [
    (email: string) => !!email || "E-mail is required",
    (email: string) => emailRegex.test(email) || "E-mail must be valid"
  ];

  usernameRules = [
    (username: string) => !!username || "Username is required",
    (username: string) =>
      usernameRegex.test(username) ||
      "Username must be between 7 to 14 characters which contain only characters, numeric digits, underscore and first character must be a letter"
  ];

  passwordRules = [
    (password: string) => !!password || "Password is required",
    (password: string) =>
      passwordRegex.test(password) ||
      "Password must contain a minimum of eight characters, at least one uppercase letter, at least one lowercase letter, one number and one special character"
  ];

  passwordConfirmRules = [
    (passwordConfirm: string) =>
      !!passwordConfirm || "Confirm password is required",
    (passwordConfirm: string) =>
      passwordConfirm === this.registrationForm.password ||
      "Passwords don't match"
  ];

  registrationForm = {
    name: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: ""
  };

  registrationSuccess = false;
  registrationFailure = false;

  registrationToast = {
    type: "sucess",
    text: "",
    show: false
  };

  loading = {
    error: false,
    registering: false
  };

  async onClickRegister() {
    const userToRegister = {
      name: this.registrationForm.name,
      username: this.registrationForm.username,
      email: this.registrationForm.email,
      password: this.registrationForm.password,
      passwordConfirm: this.registrationForm.passwordConfirm
    };

    try {
      const registerNewUser = await axios.post(
        "/auth/register",
        userToRegister
      );
      if (registerNewUser) {
        this.onRegistrationSuccess();
      }
    } catch (error) {
      this.onRegistrationFailure();
      throw new Error(error);
    }
  }

  onRegistrationSuccess() {
    setTimeout(() => {
      this.registrationSuccess = true;
    }, 2000);
    this.registrationSuccess = false;

    // this.$router.push("login");
  }

  onRegistrationFailure() {
    this.registrationToast = {
      type: "error",
      text: "Failure during reg",
      show: true
    };
    this.registrationFailure = true;
  }

  onClickLogin() {
    this.$router.push("login");
  }
}
</script>
<style lang="scss">
.register-card {
  position: fixed !important;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.registration-alert {
  margin-top: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
