<template>
  <div>
    <v-card class="mx-auto">
      <v-card-title>Create Post</v-card-title>
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
import axios from "axios";

@Component
export default class CreatePost extends Vue {
  postTitle = null;
  postSubTitle = null;
  postContent = null;

  async onClickCreatePost() {
    const newPost = {
      title: this.postTitle,
      subTitle: this.postSubTitle,
      content: this.postContent,
      // eslint-disable-next-line @typescript-eslint/camelcase
      user_id: "f7fb0db2-65a1-4ce5-b00b-f67a518e78e0"
    };

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

<style></style>
