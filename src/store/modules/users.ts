import {
  VuexModule,
  Module,
  getModule,
  Mutation,
  Action
} from "vuex-module-decorators";
import store from "@/store";
import { User, UserSubmit } from "../models";
import { loginUser } from "../api";

@Module({
  namespaced: true,
  name: "users",
  store,
  dynamic: true
})
class UsersModule extends VuexModule {
  user: User | null = null;

  @Mutation
  setUser(user: User) {
    this.user = user;
  }

  get username() {
    return (this.user && this.user.username) || null;
  }

  @Action({ commit: "setUser" })
  async login(usersSubmit: UserSubmit) {
    const user = await loginUser(usersSubmit);
    return user;
  }
}

export default getModule(UsersModule);
