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
import axios from "axios";

@Component
export default class CreatePost extends Vue {
  postTitle = "";
  postSubTitle = "";
  postContent = "";

  /**
   * Get user from state
   */
  get loggedInUser() {
    return UsersModule.loggedInUser;
  }

  async onClickCreatePost() {
    console.log("loggedInUser", this.loggedInUser);
    const newPost = {
      title: this.postTitle,
      subTitle: this.postSubTitle,
      content: this.postContent,
      username: this.loggedInUser.username
    };

    try {
      await PostsModule.createPost(newPost);
    } catch (error) {
      throw new Error(error);
    }

    const createPost = await axios.post(
      `${process.env.VUE_APP_SERVER_URL}/posts/create`,
      newPost
    );

    if (createPost) {
      this.$router.push("/");
    }
  }

  onClickCancel() {
    console.log("cancelled post");
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
