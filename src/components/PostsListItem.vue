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
          post.title
        }}</v-card-title>
        <v-card-subtitle class="posts-list-item__subtitle">
          {{ post.content }}
        </v-card-subtitle>

        <div class="posts-list-item__actions mt-3">
          <div class="posts-list-item__actions-author">
            {{ post.author }}
          </div>

          <div class="posts-list-item__actions-date">
            {{ post.date }}
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
              color="red lighten-2"
              @click="onClickDislikePost"
            >
              <v-icon>mdi-thumb-down</v-icon>
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
import { like, dislike } from "@/api/likes";
import { UsersModule } from "@/store/modules/users";

@Component
export default class PostsListItem extends Vue {
  name = "PostsListItem";
  @Prop() post!: any;

  likeColor = "lighten-2";

  /**
   * Load image from post
   */
  get imgSrc() {
    return `${process.env.VUE_APP_BASE_URL}/${this.post.photo.title}`;
  }

  /**
   * Get user from state
   */
  get loggedInUser() {
    return UsersModule.GET_USER;
  }

  /**
   * Event handler for liking a post
   */
  async onClickLikePost() {
    const res = await like({
      user_uid: this.loggedInUser.uid,
      post_uid: this.post.uid
    });

    if (res) {
      this.onUpdateIconColor("like");
    }
    console.log("res: ", res);
  }

  /**
   * Event handler for disliking a post
   */
  onClickDislikePost() {
    console.log("disliked post");
  }

  /**
   * Event handler for sharing a post
   */
  onClickSharePost() {
    console.log("shared post");
  }

  onUpdateIconColor(method: string) {
    if (method === "like") {
      this.likeColor = "blue lighten-2";
    }
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
