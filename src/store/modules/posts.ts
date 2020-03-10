import {
  VuexModule,
  Module,
  getModule,
  Mutation,
  Action
} from "vuex-module-decorators";
import store from "@/store";
import { PostSubmit } from "../models/posts.models";
import { create, get } from "@/api/posts";
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
  public sub_title = "";
  public content = "";

  @Mutation
  private SET_POST_UID(uid: string) {
    this.uid = uid;
  }

  @Mutation
  private SET_POST_TITLE(title: string) {
    this.title = title;
  }
  @Mutation
  private SET_POST_SUBTITLE(sub_title: string) {
    this.sub_title = sub_title;
  }

  @Mutation
  private SET_POST_CONTENT(content: string) {
    this.content = content;
  }

  @Action({ rawError: true })
  async createPost(postsSubmit: PostSubmit) {
    const response: any = await create(postsSubmit);
    console.log('response', response)
    if (typeof response !== "undefined") {
      const { uid, title, sub_title, content } = response;

      this.SET_POST_UID(uid);
      this.SET_POST_TITLE(title);
      this.SET_POST_SUBTITLE(sub_title);
      this.SET_POST_CONTENT(content);
    }
  }

  @Action({ rawError: true })
  async getAllPosts() {
    await get();
  }
}

export const PostsModule = getModule(Posts);
