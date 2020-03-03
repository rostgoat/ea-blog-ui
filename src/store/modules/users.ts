import {
  VuexModule,
  Module,
  getModule,
  Mutation,
  Action
} from "vuex-module-decorators";
import store from "@/store";
import { User, UserSubmit } from "../models";
import { loginUser, logoutUser } from "@/api/users";
import { getToken, setToken } from "@/utils/cookies";
@Module({
  namespaced: true,
  name: "user",
  store,
  dynamic: true,
  preserveState: true
})
class Users extends VuexModule {
  public username = "";
  public name = "";
  public email = "";
  public token = getToken() || "";

  @Mutation
  private SET_USERNAME(username: string) {
    this.username = username;
  }

  @Mutation
  private SET_NAME(name: string) {
    this.name = name;
  }

  @Mutation
  private SET_EMAIL(email: string) {
    this.email = email;
  }

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token;
  }

  @Action
  async login(usersSubmit: UserSubmit) {
    const response: any = await loginUser(usersSubmit);
    console.log("response", response);
    const { token, username, email, name } = response;

    setToken(token);
    this.SET_TOKEN(token);
    this.SET_USERNAME(username);
    this.SET_NAME(name);
    this.SET_EMAIL(email);
  }

  @Action
  async logout() {
    await logoutUser();
    this.SET_TOKEN("");
  }

  get userUsername() {
    return this.username || null;
  }
}

export const UsersModule = getModule(Users);
