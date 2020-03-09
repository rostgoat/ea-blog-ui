import {
  VuexModule,
  Module,
  getModule,
  Mutation,
  Action
} from "vuex-module-decorators";
import store from "@/store";
import { UserSubmitLogin, UserSubmitRegister } from "../models/users.models";
import { login, register } from "@/api/users";
import { setToken } from "@/utils/cookies";

@Module({
  namespaced: true,
  name: "users",
  store,
  dynamic: true,
  preserveState: true
})
class Users extends VuexModule {
  public username = "";
  public name = "";
  public token = "";
  public uid = "";

  @Mutation
  private SET_USERNAME(username: string) {
    this.username = username;
  }

  @Mutation
  private SET_NAME(name: string) {
    this.name = name;
  }

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token;
  }

  @Mutation
  private SET_UID(uid: string) {
    this.uid = uid;
  }

  @Action({ rawError: true })
  async registerUser(params: UserSubmitRegister) {
    await register(params);
  }

  @Action({ rawError: true })
  async loginUser(params: UserSubmitLogin) {
    const response: any = await login(params);
    if (typeof response !== "undefined") {
      const { accessToken, username, name, uid } = response;

      setToken(accessToken);
      this.SET_UID(uid);
      this.SET_TOKEN(accessToken);
      this.SET_USERNAME(username);
      this.SET_NAME(name);
    }
  }

  @Action({ rawError: true })
  async logout() {
    this.SET_UID("");
    this.SET_TOKEN("");
    this.SET_USERNAME("");
    this.SET_NAME("");
  }

  get userUsername() {
    return this.username || null;
  }

  get loggedInUser() {
    return {
      username: this.username,
      token: this.token,
      name: this.name
    };
  }
}

export const UsersModule = getModule(Users);
