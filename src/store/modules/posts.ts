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
  public posts = [];

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

  @Mutation
  private SET_POSTS(posts: any) {
    this.posts = posts;
  }

  @Action({ rawError: true })
  async createPost(postsSubmit: PostSubmit) {
    await create(postsSubmit);
  }

  @Action({ rawError: true })
  async getAllPosts() {
    const response: any = await get();
    if (typeof response !== "undefined") {
      this.SET_POSTS(response);
    }
  }

  get getPosts() {
    return this.posts || [];
  }
}

export const PostsModule = getModule(Posts);
