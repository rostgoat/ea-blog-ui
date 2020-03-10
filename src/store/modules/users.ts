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
import { SET_USERNAME, SET_NAME, SET_TOKEN, SET_UID } from '../types/mutations';
import { REGISTER_USER, LOGIN_USER, LOGOUT_USER } from '../types/actions';
import { GET_USERNAME, GET_USER } from '../types/getters';

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
  private [SET_USERNAME](username: string) {
    this.username = username;
  }

  @Mutation
  private [SET_NAME](name: string) {
    this.name = name;
  }

  @Mutation
  private [SET_TOKEN](token: string) {
    this.token = token;
  }

  @Mutation
  private [SET_UID](uid: string) {
    this.uid = uid;
  }

  @Action({ rawError: true })
  async [REGISTER_USER](params: UserSubmitRegister) {
    await register(params);
  }

  @Action({ rawError: true })
  async [LOGIN_USER](params: UserSubmitLogin) {
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
  async [LOGOUT_USER]() {
    this.SET_UID("");
    this.SET_TOKEN("");
    this.SET_USERNAME("");
    this.SET_NAME("");
  }

  get [GET_USERNAME]() {
    return this.username || null;
  }

  get [GET_USER]() {
    return {
      username: this.username,
      token: this.token,
      name: this.name,
      uid: this.uid
    };
  }
}

export const UsersModule = getModule(Users);
