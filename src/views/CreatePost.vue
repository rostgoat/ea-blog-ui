<template>
  <div>
    <v-card class="mx-auto create-post-card" width="800">
      <v-card-title class="create-post-card__title">
        <h1>Create Post</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
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
          <!-- <v-file-input
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Pick a blog photo"
            prepend-icon="mdi-camera"
            clearable
            v-model="file"
            v-cloak
            @change="filesChange($event)"
            @drop.prevent="addDropFile"
            @dragover.prevent
          ></v-file-input> -->

          <ImageUploader @formData="onImageUploaded" />
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
import { Component } from "vue-property-decorator";
import { UsersModule } from "@/store/modules/users";
import { PostsModule } from "@/store/modules/posts";
import { Mixins } from "vue-mixin-decorator";
import SuccessMixin from "../mixins/success";
import { inputLength } from "@/utils/validators";
import ImageUploader from "@/components/ImageUploader.vue";
import { upload } from "@/api/photos";

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

  file: any = null;

  /**
   * Get user from state
   */
  get loggedInUser() {
    return UsersModule.GET_USER;
  }

  async onImageUploaded(file: FormData) {
    console.log("file", file.get("post_photo"));
    this.file = file;

    await upload(this.file);
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
      user_uid: this.loggedInUser.uid
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

  &__title {
    @include center-card__title;
  }
}
</style>
