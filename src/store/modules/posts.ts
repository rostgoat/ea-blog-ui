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
import {
  GET_ALL_POSTS,
  CREATE_POST,
  UPDATE_POSTS,
  CREATE_LIKES
} from "../types/actions";
import { SET_POSTS, SET_LIKE_PROPS, SET_LIKES } from "../types/mutations";

@Module({
  namespaced: true,
  name: "posts",
  store,
  dynamic: true,
  // preserveState: true
  preserveState: localStorage.getItem('posts') !== null
})
class Posts extends VuexModule {
  public posts: any[] = [];

  @Mutation
  private [SET_POSTS](posts: any) {
    this.posts = posts;
  }

  @Mutation
  private [SET_LIKES](data: any) {
    const { post_uid } = data;
    this.posts.forEach((post: any) => {
      if (post.p_uid === post_uid) {
        const tempPost = post;
        tempPost.likes = [];
        post = Object.assign(post, tempPost);
      }
    });
  }

  @Mutation
  private [SET_LIKE_PROPS](data: any) {
    this.posts.forEach((post: any) => {
      const currentPost = data[post.p_uid];
      
      if (currentPost) {
        // copy the likes array into a temp variable
        const newLikes = post.likes;

        // post have never been liked
        if (newLikes.length === 0) {
          const newPost = {
            l_uid: currentPost.uid,
            post_liked: currentPost.post_liked,
            post_uid: post.p_uid,
            user_uid: currentPost.user.uid,
          };
          newLikes.push(newPost);
          // post has been liked before (need to update the specific like in the array)
        } else {
          // post has likes
          const likeExists = newLikes.some((like: any) => like.l_uid === currentPost.uid);
          // current user has never liked this post
          if (!likeExists) {
            const newLike = {
              l_uid: currentPost.uid,
              post_liked: currentPost.post_liked,
              post_uid: post.p_uid,
              user_uid: currentPost.user.uid,
            };
            newLikes.push(newLike);
          } else {
            // updating existing like
            newLikes.forEach((like: any) => {
              if (like.l_uid === currentPost.uid) {
                like.post_liked = currentPost.post_liked;
              }
            });
          }
        }
        post.likes = Object.assign(post.likes, newLikes);
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

  @Action({ rawError: true })
  async [CREATE_LIKES](data: any) {
    this.SET_LIKES(data);
  }

  get [GET_POSTS]() {
    return this.posts || [];
  }
}

export const PostsModule = getModule(Posts);
