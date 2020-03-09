<template>
  <div>
    <v-card class="mx-auto create-post-card" width="800">
      <v-card-title class="create-post-card__title">
        <h1>Create Post</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="postTitle"
            :counter="100"
            label="Title"
            required
          ></v-text-field>
          <v-text-field
            v-model="postSubTitle"
            :counter="250"
            label="Sub Title"
            required
          ></v-text-field>
          <v-textarea
            v-model="postContent"
            :counter="10000"
            label="Content"
            required
          ></v-textarea>
          <v-card-actions>
            <v-btn color="danger" @click="onClickCancel">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="onClickCreatePost">Create</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { UsersModule } from "@/store/modules/users";
import { PostsModule } from "@/store/modules/posts";
import { Mixins } from "vue-mixin-decorator";
import SuccessMixin from '../mixins/success';

@Component
export default class CreatePost extends Mixins<SuccessMixin>(SuccessMixin) {
  postTitle = "";
  postSubTitle = "";
  postContent = "";

  /**
   * Get user from state
   */
  get loggedInUser() {
    return UsersModule.loggedInUser;
  }

  /**
   * Create post method handler. Grabs user uid from the state and
   * makes API call to create a new post with that user uid.
   */
  async onClickCreatePost() {
    console.log("loggedInUser", this.loggedInUser);
    const newPost = {
      title: this.postTitle,
      subTitle: this.postSubTitle,
      content: this.postContent,
      userUid: this.loggedInUser.uid
    };

    try {
      await PostsModule.createPost(newPost);
      this.onClickCreatePostSuccess();
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Create post success handler
   */
  onClickCreatePostSuccess() {
    this.$successMixinMessage("Post Created Succefully!")
    this.$router.push("/");
  }

  /**
   * Cancel button handler
   */
  onClickCancel() {
    this.$router.push("/");
  }
}
</script>

<style lang="scss">
.create-post-card {
  @include center-card;

  &__title {
    @include center-card__title;
  }
}
</style>
