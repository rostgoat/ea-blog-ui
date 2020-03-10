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
import {GET_POSTS} from '../types/getters'
import { GET_ALL_POSTS, CREATE_POST } from '../types/actions';
import { SET_POSTS } from '../types/mutations';

@Module({
  namespaced: true,
  name: "posts",
  store,
  dynamic: true,
  preserveState: true
})
class Posts extends VuexModule {
  public posts = [];

  @Mutation
  private [SET_POSTS](posts: any) {
    this.posts = posts;
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

  get [GET_POSTS]() {
    return this.posts || [];
  }
}

export const PostsModule = getModule(Posts);
