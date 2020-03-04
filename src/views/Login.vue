<template>
  <v-app class="login-container">
    <div class="login-alert">
      <ToastManager :toast="loginToast" />
    </div>
    <v-card width="400" class="mx-auto mt-5 login-card">
      <v-card-title>
        <h1 class="display-1">Login</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
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
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <!-- <v-btn color="success" @click="onClickRegister">Register</v-btn> -->
        <v-spacer></v-spacer>
        <v-btn color="info" @click="onClickLogin">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { UsersModule } from "@/store/modules/users";
import ToastManager from "@/components/ToastManager.vue";

@Component({
  components: { ToastManager }
})
export default class Login extends Vue {
  name = "Login";
  showPassword = false;

  show = false;

  usernameRules = [(username: string) => !!username || "Username is required"];

  passwordRules = [(password: string) => !!password || "Password is required"];
  loginForm = {
    username: "",
    password: ""
  };

  loginSuccess = false;
  loginFailure = false;

  loginToast = {
    type: "sucess",
    text: "",
    show: false
  };

  @Prop() toggleLogin!: boolean;

  onClickLogin() {
    const userToLogin = {
      username: this.loginForm.username,
      password: this.loginForm.password
    };
    const response = UsersModule.login(userToLogin);
    console.log("response login", response);
    // if (response) {
    //   this.$router.push("/");
    // }
  }

  onLoginFailure() {
    this.loginToast = {
      type: "error",
      text: "Failed during login!",
      show: true
    };
    this.loginFailure = true;
  }

  onClickRegister() {
    this.$router.push("login");
  }
}
</script>

<style lang="scss">
.login-card {
  position: fixed !important;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.login-alert {
  margin-top: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
