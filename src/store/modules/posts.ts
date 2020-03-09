import {
  VuexModule,
  Module,
  getModule,
  Mutation,
  Action
} from "vuex-module-decorators";
import store from "@/store";
import { PostSubmit } from "../models/posts.models";
import { create } from "@/api/posts";
import { setToken } from "@/utils/cookies";

@Module({
  namespaced: true,
  name: "posts",
  store,
  dynamic: true,
  preserveState: true
})
class Posts extends VuexModule {
  public uid = "";
  public title = "";
  public content = "";

  @Mutation
  private SET_POST_UID(uid: string) {
    this.uid = uid;
  }

  @Mutation
  private SET_POST_NAME(title: string) {
    this.title = title;
  }

  @Mutation
  private SET_POST_CONTENT(content: string) {
    this.content = content;
  }

  @Action({ rawError: true })
  async createPost(postsSubmit: PostSubmit) {
    const response: any = await create(postsSubmit);
    if (typeof response !== "undefined") {
      const { uid, name, content } = response;

      this.SET_POST_UID(uid);
      this.SET_POST_NAME(name);
      this.SET_POST_CONTENT(content);
    }
  }
}

export const PostsModule = getModule(Posts);
