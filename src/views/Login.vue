<template>
  <v-app class="login-container">
    <v-card width="400" class="mx-auto login-card">
      <v-card-title class="login-card__title">
        <h1>Login</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            class="login-card__username-input"
            label="Username"
            v-model="loginForm.username"
            :rules="usernameRules"
            prepend-icon="mdi-account-circle"
          ></v-text-field>
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            v-model="loginForm.password"
            :rules="passwordRules"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            @keyup.native.enter="onClickLogin"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <router-link to="/register"
          ><a class="register-link"
            >Don't have an account yet? Sign up here.</a
          ></router-link
        >
        <v-spacer></v-spacer>
        <v-btn color="info" @click="onClickLogin">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script lang="ts">
import $ from "jquery";
import { Component, Prop } from "vue-property-decorator";
import { UsersModule } from "@/store/modules/users";
import { Mixins } from "vue-mixin-decorator";
import SuccessMixin from "../mixins/success";

@Component
export default class Login extends Mixins<SuccessMixin>(SuccessMixin) {
  name = "Login";
  showPassword = false;
  usernameRules = [(username: string) => !!username || "Username is required"];
  passwordRules = [(password: string) => !!password || "Password is required"];
  loginForm = {
    username: "",
    password: ""
  };
  @Prop() toggleLogin!: boolean;

  /**
   * Get user from state
   */
  get loggedInUser() {
    return UsersModule.GET_USER;
  }

  /**
   * Focus on username input on mount
   */
  mounted() {
    // hacking with Jquery because Vuetify doesn't have input autofocus
    $("input:text:visible:first").focus();
  }

  /**
   * Sign user in
   */
  async onClickLogin() {
    const userToLogin = {
      username: this.loginForm.username,
      password: this.loginForm.password
    };

    try {
      await UsersModule.LOGIN_USER(userToLogin);
      this.onClickLoginSuccess();
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Login Suceess message
   */
  onClickLoginSuccess() {
    this.$successMixinMessage("Login Succeful!");
    this.$router.push("/");
  }
}
</script>

<style lang="scss">
.login-card {
  @include center-card;

  &__title {
    @include center-card__title;
  }
}

.login-alert {
  margin-top: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
