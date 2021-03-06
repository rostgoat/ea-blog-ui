<template>
  <div>
    <v-card class="mx-auto create-post-card" width="800">
      <v-card-title class="create-post-card__title">
        <h1>Create Post</h1>
      </v-card-title>
      <v-card-text>
        <v-form enctype="multipart/form-data">
          <v-text-field
            v-model="postCreateForm.postTitle"
            :counter="100"
            label="Title"
            required
          ></v-text-field>
          <v-text-field
            v-model="postCreateForm.postSubTitle"
            :counter="250"
            label="Sub Title"
            required
          ></v-text-field>
          <v-textarea
            v-model="postCreateForm.postContent"
            :counter="10000"
            label="Content"
            required
          ></v-textarea>
          <ImageUploader @onImageUploaded="onImageUploaded" />
          <v-card-actions class="create-post-card__buttons">
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
import { Component } from "vue-property-decorator";
import { UsersModule } from "@/store/modules/users";
import { PostsModule } from "@/store/modules/posts";
import { Mixins } from "vue-mixin-decorator";
import SuccessMixin from "../mixins/success";
import { inputLength } from "@/utils/validators";
import ImageUploader from "@/components/ImageUploader.vue";

@Component({
  components: {
    ImageUploader
  }
})
export default class CreatePost extends Mixins<SuccessMixin>(SuccessMixin) {
  postCreateForm = {
    postTitle: "",
    postSubTitle: "",
    postContent: ""
  };

  postTitleRules = [
    (title: string) => !!title || "Title is required",
    (title: string) =>
      inputLength.test(title) ||
      "Title Length needs to be between 0 to 100 characters."
  ];

  post_image_bucket_key = "";

  /**
   * Get user from state
   */
  get loggedInUser() {
    return UsersModule.GET_USER;
  }

  /**
   * Callback event handler from Image Uploader class that
   * returns the response data from the API
   */
  onImageUploaded(response: any) {
    if (response) {
      this.post_image_bucket_key = response;
    }
  }

  /**
   * Create post method handler. Grabs user uid from the state and
   * makes API call to create a new post with that user uid.
   */
  async onClickCreatePost() {
    const newPost = {
      title: this.postCreateForm.postTitle,
      sub_title: this.postCreateForm.postSubTitle,
      content: this.postCreateForm.postContent,
      user_uid: this.loggedInUser.uid,
      post_image_bucket_key: this.post_image_bucket_key
    };

    try {
      await PostsModule.CREATE_POST(newPost);
      this.onClickCreatePostSuccess();
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Create post success handler
   */
  onClickCreatePostSuccess() {
    this.$successMixinMessage("Post Created Succefully!");
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
  overflow: scroll !important;

  @media screen and (min-height: 320px) and (max-height: 890px) {
    height: 100%;
  }
  @media screen and (min-width: 320px) {
    margin-top: 4rem;
  }

  &__title {
    @include center-card__title;
  }

  &__buttons {
    margin-bottom: 4rem;
    margin-top: 1rem;
  }
}
</style>
