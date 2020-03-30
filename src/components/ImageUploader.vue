<template>
  <div>
    <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
      <h1>Upload images</h1>
      <div class="dropbox">
        <input
          type="file"
          :disabled="isSaving"
          @change="onImageSelected"
          accept="image/*"
          class="input-file"
        />
        <p v-if="isInitial">
          Drag your image here to begin<br />
          or click to browse
        </p>
        <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { upload } from "@/api/photos";
import { UsersModule } from "@/store/modules/users";

@Component
export default class ImageUploader extends Vue {
  uploadedFiles = [];
  uploadError = null;
  currentStatus = 0; // 0 by default
  filesLength = 0;
  uploadFieldName = "post_photo";
  selectedImage: string | Blob = "";
  selectedImageName = "";
  loading = false;

  // upload status codes
  STATUS_INITIAL = 0;
  STATUS_SAVING = 1;
  STATUS_SUCCESS = 2;
  STATUS_FAILED = 3;

  /**
   * Get user from state
   */
  get loggedInUser() {
    return UsersModule.GET_USER;
  }

  /**
   * Number of images to upload
   */
  get fileCount() {
    return this.filesLength;
  }

  /**
   * Image status before upload begins (default)
   */
  get isInitial() {
    return this.currentStatus === this.STATUS_INITIAL;
  }

  /**
   * Image status while uploading image to API
   */
  get isSaving() {
    return this.currentStatus === this.STATUS_SAVING;
  }

  /**
   * Image status of succesfully uploaded image
   */
  get isSuccess() {
    return this.currentStatus === this.STATUS_SUCCESS;
  }

  /**
   * Image status if there was an error during uploading
   */
  get isFailed() {
    return this.currentStatus === this.STATUS_FAILED;
  }

  /**
   * Reset form on mounted
   */
  mounted() {
    this.reset();
  }

  /**
   * Gather image information from the input field and
   * add that information to FormData object
   */
  async onImageSelected(event: any) {
    const { target } = event;

    this.selectedImage = target.files[0];
    this.selectedImageName = target.files[0].name;
    this.filesLength = target.files.length;

    const formData = new FormData();

    // add image info to formdata
    formData.append(
      this.uploadFieldName,
      this.selectedImage,
      this.selectedImageName
    );

    formData.append(this.loggedInUser.name, this.loggedInUser.uid);

    // upload image to database
    await this.onImageUpload(formData);
  }

  /**
   * Upload image to database
   */
  async onImageUpload(form: FormData) {
    this.currentStatus = this.STATUS_SAVING;

    try {
      const res = await upload(form);
      if (res) {
        this.$emit("onImageUploaded", res);
        this.currentStatus = this.STATUS_SUCCESS;
      }
    } catch (error) {
      this.uploadError = error.response;
      this.currentStatus = this.STATUS_FAILED;
      throw new Error(error);
    }
  }

  /**
   * Reset image upload form to default on page mount
   */
  reset() {
    // reset form to initial state
    this.currentStatus = this.STATUS_INITIAL;
    this.uploadedFiles = [];
    this.uploadError = null;
  }
}
</script>
<style lang="scss">
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: lightblue; /* when mouse over to the drop zone change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>
