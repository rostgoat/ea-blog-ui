<template>
  <v-card class="mx-auto mt-5 posts-list-item" outlined>
    <v-container class="posts-list-item__content">
      <v-card flat class="posts-list-item__container posts-list-item__image">
        <v-img
          id="photo"
          class="pa-2 posts-list-item__img"
          :src="imgSrc"
          aspect-ratio="1.7"
        ></v-img>
      </v-card>
      <v-card
        flat
        class="posts-list-item__container posts-list-item__description"
      >
        <v-card-title class="mb-4 posts-list-item__title">{{
          post.post_title
        }}</v-card-title>

        <v-card-subtitle class="posts-list-item__subtitle">
          {{ post.post_subtitle }}
        </v-card-subtitle>

        <v-card-text class="posts-list-item__content">
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
              <v-icon>mdi-thumb-up</v-icon>
            </v-btn>

            <div class="posts-list-item__like-count">
              {{ count }}
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

@Component
export default class PostsListItem extends Vue {
  name = "PostsListItem";
  @Prop() post!: any;

  content = "";
  count: number | Promise<any> = 0;

  /**
   * Load image from post
   */
  get imgSrc() {
    return `${process.env.VUE_APP_BASE_URL}/${this.post.photo_title}`;
  }

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
  }

  /**
   * If content length is too long, trim it and add `...` to end
   */
  trimPostContentLength() {
    const len = this.postLength;
    if (len > 1000) {
      this.content += `${this.post.post_content.substring(0, 500)}...`;
      return this.content;
    }
  }

  async getLikesCount() {
    return await likesCount({ post_uid: this.post.p_uid });
  }
  /**
   * Event handler for liking, unliking and reliking a post
   */
  async onClickLikePost() {
    // liking post for the first time
    this.post.likes.forEach(async (like: any) => {
      if (like.user_uid !== this.loggedInUser.uid) {
        // post is NOT liked (false in db) AND does NOT have a uid
        await this.postLikeAction("like", like);
      }
    });

    // unlike post
    this.post.likes.forEach(async (like: any) => {
      if (like.user_uid === this.loggedInUser.uid && like.post_liked) {
        // post IS liked AND post uid exist in state
        await this.postLikeAction("unlike", like);
      }
    });

    // relike post
    this.post.likes.forEach(async (like: any) => {
      if (like.user_uid === this.loggedInUser.uid && !like.post_liked) {
        // post is NOT liked (false in db) but has a uid
        await this.postLikeAction("relike", like);
      }
    });
  }

  /**
   * Like / unlike / relike a post
   */
  async postLikeAction(action: string, args: any) {
    let res;

    const { l_uid, post_liked, post_uid, user_uid } = args;

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
    const count = await this.getLikesCount();
    console.log("count", count);
  }
}
</script>

<style lang="scss">
.posts-list-item {
  width: 90% !important;
  margin: auto !important;
  transition: all 0.3s ease !important;

  &:hover {
    transform: translateY(-2px);
    box-shadow: map-get($box-shadows, boxShadowDark);
    cursor: pointer;
  }
  &__title {
    font-size: 2rem !important;
  }

  &__subtitle {
    font-size: 1.6rem !important;
    color: map-get($colors, primary) !important;
    font-style: italic;
  }

  &__content {
    display: flex !important;
    text-overflow: ellipsis !important;
    font-size: 1.1rem !important;
    color: map-get($colors, secondary) !important;
    line-height: 1.4 !important;
  }

  &__container {
    margin: none !important;
  }

  &__image {
    width: 33%;
  }

  &__description {
    width: 66%;
    display: grid !important;
    grid-template-rows: 25% 10% auto 25%;
  }

  &__actions {
    display: flex;
    margin: 1rem;
    margin-right: 4rem;
    justify-content: center;
    align-items: center;

    &-author {
      font-size: 1rem;
      font-weight: 300;
    }

    &-date {
      font-size: 1rem;
      color: grey;
      margin-left: 1rem;
      font-style: italic;
    }

    &-buttons {
      font-size: 0.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  &__like-count {
    font-size: 1.15rem;
    color: grey;
    margin: 0.5rem;
  }
}
</style>
