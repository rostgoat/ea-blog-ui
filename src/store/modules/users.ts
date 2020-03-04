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
  name: "users",
  store,
  dynamic: true,
  preserveState: true
})
class Users extends VuexModule {
  public username = "";
  public name = "";
  public token = "";

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

  @Action({ rawError: true })
  async login(usersSubmit: UserSubmit) {
    const response: any = await loginUser(usersSubmit);
    if (typeof response !== "undefined") {
      const { accessToken, username, name } = response;

      setToken(accessToken);
      this.SET_TOKEN(accessToken);
      this.SET_USERNAME(username);
      this.SET_NAME(name);
    }
  }

  @Action({ rawError: true })
  async logout() {
    await logoutUser();
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
