<template>
  <v-card class="mx-auto mt-5 posts-list-item" outlined>
    <v-container class="posts-list-item__content">
      <v-card
        flat
        class="posts-list-item__container posts-list-item__image"
        @click="onClickPost"
      >
        <div class="pa-2 posts-list-item__img">
          <v-img
            id="photo"
            :src="imageSource"
            aspect-ratio="1.7"
            contain
          ></v-img>
        </div>
      </v-card>
      <v-card
        flat
        class="posts-list-item__container posts-list-item__description"
      >
        <v-card-title class="posts-list-item__title" @click="onClickPost">
          <h2>{{ post.post_title }}</h2>
        </v-card-title>

        <v-card-subtitle class="posts-list-item__subtitle" @click="onClickPost">
          <h3>{{ post.post_subtitle }}</h3>
        </v-card-subtitle>

        <v-card-text class="posts-list-item__post-content" @click="onClickPost">
          {{ content }}
        </v-card-text>

        <div class="posts-list-item__actions mt-3">
          <div class="posts-list-item__actions-author">
            {{ post.post_author }}
          </div>

          <div class="posts-list-item__actions-date">
            {{ formatPostCreatedDate }}
          </div>

          <v-row
            align="center"
            justify="end"
            class="posts-list-item__actions-buttons"
          >
            <v-btn
              class="ma-2"
              text
              icon
              color="blue lighten-2"
              @click="onClickLikePost"
            >
              <v-icon :disabled="!loggedInUser.uid">mdi-thumb-up</v-icon>
            </v-btn>

            <div class="posts-list-item__like-count">
              {{ count > 0 ? count : "" }}
            </div>
          </v-row>
        </div>
      </v-card>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { like, unlike, relike, likesCount } from "@/api/likes";
import { UsersModule } from "@/store/modules/users";
import { PostsModule } from "@/store/modules/posts";
import moment from "moment";
import * as _ from "lodash";
import StorageMixin from "../mixins/storage";
import { Mixins } from "vue-mixin-decorator";

@Component
export default class PostsListItem extends Mixins<StorageMixin>(StorageMixin) {
  name = "PostsListItem";
  @Prop() post!: any;

  content = "";
  count: number | Promise<any> = 0;

  imageSource = "";

  /**
   * Get user from state
   */
  get loggedInUser() {
    return UsersModule.GET_USER;
  }

  /**
   * Get content post length
   */
  get postLength() {
    return this.post.post_content.length;
  }

  /**
   * Format post creation date for user readibility
   */
  get formatPostCreatedDate() {
    return moment(this.post.post_created_at).format("MMMM DD, YYYY");
  }

  /**
   * When DOM mounts check to see if post has been liked
   */
  async mounted() {
    this.count = await this.getLikesCount();
    this.trimPostContentLength();
    this.getImageURL();
  }

  /**
   * Get signed url from s3
   */
  async getImageURL() {
    this.imageSource = await this.$storageMixinGetSignedURL(
      process.env.VUE_APP_AWS_BUCKET,
      this.post.post_image_bucket_key
    );
  }

  /**
   * Redirect to specific post view
   */
  onClickPost() {
    this.$router.push(`/view/${this.post.p_uid}`, this.post);
  }

  /**
   * If content length is too long, trim it and add `...` to end
   */
  trimPostContentLength() {
    const len = this.postLength;
    if (len > 1000) {
      this.content += `${this.post.post_content.substring(0, 350)}...`;
      return this.content;
    }
  }

  /**
   * Number of likes from all users on a post
   */
  async getLikesCount() {
    return await likesCount({ post_uid: this.post.p_uid });
  }

  /**
   * Event handler for liking, unliking and reliking a post
   */
  async onClickLikePost() {
    // check if `likes` prop exists on post - if not then create it
    if (!_.has(this.post, "likes")) {
      await PostsModule.CREATE_LIKES({ post_uid: this.post.p_uid });
    }

    //Case 1: no user has ever liked this post
    if (this.post.likes.length === 0) {
      // post is NOT liked (false in db) AND does NOT have a uid
      await this.postLikeAction("like", {
        post_uid: this.post.p_uid
      });

      // current user or another user has liked this post before
    } else if (this.post.likes.length > 0) {
      // case 2: at least 1 user has liked this post BUT NOT the currently logged in user
      const previouslyLikedByAnotherUser = this.post.likes.every(
        (like: any) => {
          return like.user_uid !== this.loggedInUser.uid;
        }
      );

      // case 3: current user already likes this post but wants to unlike it
      const previouslyLikedByCurrentUser = this.post.likes.filter(
        (like: any) =>
          like.user_uid === this.loggedInUser.uid && like.post_liked
      );

      // case 4: current user has unliked this post but wants to relike it
      const previouslyUnLikedByCurrentUser = this.post.likes.filter(
        (like: any) =>
          like.user_uid === this.loggedInUser.uid && !like.post_liked
      );

      if (previouslyLikedByAnotherUser) {
        const newLike = { post_uid: this.post.p_uid };
        await this.postLikeAction("like", newLike);
      } else if (previouslyLikedByCurrentUser.length > 0) {
        await this.postLikeAction("unlike", previouslyLikedByCurrentUser[0]);
      } else if (previouslyUnLikedByCurrentUser.length > 0) {
        await this.postLikeAction("relike", previouslyUnLikedByCurrentUser[0]);
      }
    }
  }

  /**
   * Like / unlike / relike a post
   */
  async postLikeAction(action: string, args: any) {
    // api response object
    let res;

    // pased in args
    const { l_uid, post_liked, post_uid } = args;

    // default api call params
    const data = {
      uid: l_uid,
      post_liked: post_liked
    };

    // Method creates a Like object in the database and flips `post_liked` prop to true
    if (action === "like") {
      const newLikeData = {
        user_uid: this.loggedInUser.uid,
        post_uid
      };

      res = await like(newLikeData);
      // Method updates the Like object in the database and flips `post_liked` prop to false
    } else if (action === "unlike") {
      res = await unlike(data);

      // Method exists to simply relike a post a flip `post_liked` to true
    } else if (action === "relike") {
      res = await relike(data);
    }

    // assing post_uid as key to modify like status in state
    const out: any = {};
    out[this.post.p_uid] = res;

    // update the post object in state with 'like' data
    await PostsModule.UPDATE_POSTS(out);

    // get likes count
    this.count = await this.getLikesCount();
  }
}
</script>

<style lang="scss">
.posts-list-item {
  width: 90% !important;
  margin: auto !important;
  transition: all 0.3s ease !important;
  min-width: 0;

  &:hover {
    transform: translateY(-2px);
    box-shadow: map-get($box-shadows, boxShadowDark);
    cursor: pointer;
  }
  &__img {
    margin: 0.3rem;
  }

  &__title {
    margin-top: 0.5rem !important;
    margin-bottom: 1rem !important;
    padding: 0px !important;

    @media (max-width: 900px) {
      font-size: 1.7rem;
      line-height: 2rem;
      letter-spacing: 0.03rem;
      margin-top: 0.5rem !important;
      margin-bottom: 2rem !important;
    }
  }

  &__subtitle {
    color: map-get($colors, primary) !important;
    font-style: italic !important;
    padding: 0px !important;

    @media (max-width: 900px) {
      font-size: 1.3rem;
      line-height: 1.6rem;
      letter-spacing: 0.03rem;
      margin-bottom: 1rem !important;
    }
  }

  &__post-content {
    padding: 0 !important;
    display: flex !important;
    text-overflow: ellipsis !important;
    color: map-get($colors, secondary) !important;
    text-align: justify;
    line-height: 1.4 !important;
    font-size: 1rem !important;

    @media (max-width: 900px) {
      flex-direction: column;
    }
  }

  &__content {
    padding: 0 !important;
    display: flex !important;
    text-overflow: ellipsis !important;
    color: map-get($colors, secondary) !important;
    text-align: justify;

    @media (max-width: 900px) {
      display: flex !important;
      flex-direction: column !important;
    }
  }

  &__container {
    margin: none !important;
  }

  &__image {
    width: 33%;

    @media (max-width: 900px) {
      width: 100%;
    }
  }

  &__description {
    width: 66%;
    display: grid !important;
    grid-template-rows: none;

    @media (max-width: 900px) {
      width: 100%;
    }
  }

  &__actions {
    display: flex;
    margin-right: 4rem;
    justify-content: center;
    align-items: center;

    &-author {
      font-weight: 300;
    }

    &-date {
      color: grey;
      margin-left: 1rem;
      font-style: italic;
    }

    &-buttons {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  &__like-count {
    color: grey;
    margin: 0.5rem;
  }
}
</style>
