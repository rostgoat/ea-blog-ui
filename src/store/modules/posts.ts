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
import { GET_POSTS } from "../types/getters";
import { GET_ALL_POSTS, CREATE_POST, UPDATE_POSTS } from "../types/actions";
import { SET_POSTS, SET_LIKE_PROPS } from "../types/mutations";

@Module({
  namespaced: true,
  name: "posts",
  store,
  dynamic: true,
  preserveState: true
})
class Posts extends VuexModule {
  public posts: any[] = [];

  @Mutation
  private [SET_POSTS](posts: any) {
    this.posts = posts;
  }

  @Mutation
  private [SET_LIKE_PROPS](data: any) {
    this.posts.forEach((post: any) => {
      // runs when like data in posts is null (updating likes for the first time in posts)
      if (
        post.like_uid === null &&
        post.post_liked === null &&
        post.p_uid === data.p_uid
      ) {
        post = Object.assign(post, data);

        // when posts already had like data but only status needs an update
      } else if (post.like_uid && post.p_uid === data.p_uid) {
        post = Object.assign(post, data);
      }
    });
  }

  @Action({ rawError: true })
  async [CREATE_POST](postsSubmit: PostSubmit) {
    await create(postsSubmit);
  }

  @Action({ rawError: true })
  async [GET_ALL_POSTS]() {
    const response: any = await get();
    if (typeof response !== "undefined") {
      this.SET_POSTS(response);
    }
  }

  @Action({ rawError: true })
  async [UPDATE_POSTS](data: any) {
    this.SET_LIKE_PROPS(data);
  }

  get [GET_POSTS]() {
    return this.posts || [];
  }
}

export const PostsModule = getModule(Posts);
