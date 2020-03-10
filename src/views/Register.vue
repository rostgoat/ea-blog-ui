<template>
  <v-app class="register-container">
    <v-card width="400" class="mx-auto mt-5 register-card">
      <v-card-title class="register-card__title">
        <h1>Create Your Account</h1>
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
            @keyup.native.enter="onClickRegister"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <router-link to="/login"
          ><a class="register-link"
            >Already a member? Sign in here.</a
          ></router-link
        >
        <v-spacer></v-spacer>
        <v-btn color="success" @click="onClickRegister">Register</v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { emailRegex, passwordRegex, usernameRegex } from "@/utils/validators";
import { UsersModule } from "@/store/modules/users";
import { Mixins } from "vue-mixin-decorator";
import SuccessMixin from "../mixins/success";

import ToastManager from "@/components/ToastManager.vue";
@Component({
  components: { ToastManager }
})
export default class Register extends Mixins<SuccessMixin>(SuccessMixin) {
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

  loading = {
    error: false,
    registering: false
  };

  /**
   * Registration click event handler
   */
  async onClickRegister() {
    const userToRegister = {
      name: this.registrationForm.name,
      username: this.registrationForm.username,
      email: this.registrationForm.email,
      password: this.registrationForm.password,
      passwordConfirm: this.registrationForm.passwordConfirm
    };

    try {
      await UsersModule.REGISTER_USER(userToRegister);
      this.onRegistrationSuccess();
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Registration success message
   */
  onRegistrationSuccess() {
    this.$successMixinMessage("Registration Succeful!");
    this.$router.push("/login");
  }

  /**
   * Login click event handler
   */
  onClickLogin() {
    this.$router.push("login");
  }
}
</script>
<style lang="scss">
.register-card {
  @include center-card;

  &__title {
    @include center-card__title;
  }
}
</style>
