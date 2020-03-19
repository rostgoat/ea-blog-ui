<template>
  <v-card class="mx-auto mt-5 posts-list-item" outlined>
    <v-container class="posts-list-item__content">
      <v-card flat class="posts-list-item__container posts-list-item__image">
        <v-img
          id="photo"
          class="pa-2 posts-list-item__img"
          :src="imgSrc"
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
          {{ post.post_content }}
        </v-card-subtitle>

        <div class="posts-list-item__actions mt-3">
          <div class="posts-list-item__actions-author">
            {{ post.post_author }}
          </div>

          <div class="posts-list-item__actions-date">
            {{ post.post_date }}
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
              :color="likeColor"
              @click="onClickLikePost"
            >
              <v-icon>mdi-thumb-up</v-icon>
            </v-btn>

            <v-btn
              class="ma-2"
              text
              icon
              color="green lighten-2"
              @click="onClickSharePost"
            >
              <v-icon class="mr-1">mdi-share-variant</v-icon>
            </v-btn>
          </v-row>
        </div>
      </v-card>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { like, unlike } from "@/api/likes";
import { UsersModule } from "@/store/modules/users";
import { PostsModule } from "@/store/modules/posts";

@Component
export default class PostsListItem extends Vue {
  name = "PostsListItem";
  @Prop() post!: any;

  colors = {
    liked: "blue lighten-2",
    unliked: "lighten-2"
  };

  likeColor = "lighten-2";

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
   * Get status of post like
   */
  get likeStatus() {
    return this.likeColor.includes("blue") ? true : false;
  }

  /**
   * When DOM mounts check to see if post has been liked
   */
  mounted() {
    this.post.post_liked
      ? this.onUpdateIconColor(this.colors.liked)
      : this.onUpdateIconColor(this.colors.unliked);
  }

  /**
   * Event handler for liking and post
   */
  async onClickLikePost() {
    console.log("this.likeStatus", this.likeStatus);
    console.log("this.post.like_uid", this.post.like_uid);
    if (!this.likeStatus && !this.post.like_uid) {
      const res = await like({
        user_uid: this.loggedInUser.uid,
        post_uid: this.post.p_uid
      });

      if (res.post_liked) {
        this.onUpdateIconColor(this.colors.liked);
        console.log("calling UPDATE_POSTS", res);
        await PostsModule.UPDATE_POSTS({
          like_uid: res.uid,
          post_liked: res.post_liked
        });
      }
    } else {
      console.log("unliking");
      console.log("uid", this.post.like_uid);
      console.log("post_liked", this.post.post_liked);
      const res = await unlike({
        uid: this.post.like_uid,
        post_liked: this.post.post_liked
      });
      console.log("res", res);
      if (!res.post_liked) {
        this.onUpdateIconColor(this.colors.unliked);
      }
    }
  }

  /**
   * Update like icon color
   */
  onUpdateIconColor(color: string) {
    this.likeColor = color;
  }

  /**
   * Event handler for sharing a post
   */
  onClickSharePost() {
    console.log("shared post");
  }
}
</script>

<style lang="scss">
.posts-list-item {
  width: 90% !important;
  margin: auto !important;
  &__content {
    display: flex !important;
  }

  &__container {
    margin: none !important;
  }

  &__image {
    width: 33%;
  }

  &__description {
    width: 66%;
    display: flex;
    flex-direction: column;
    align-content: stretch;
  }

  &__title {
    font-size: 2rem !important;
  }

  &__actions {
    display: flex;
    margin: 1rem;
    margin-right: 4rem;
    justify-content: center;
    align-items: center;

    &-author {
      font-size: 0.9rem;
      font-weight: 300;
    }

    &-date {
      font-size: 0.8rem;
      color: grey;
      margin-left: 1rem;
    }

    &-buttons {
      font-size: 0.8rem;
    }
  }
}
</style>
