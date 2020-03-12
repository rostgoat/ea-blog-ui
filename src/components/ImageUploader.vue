<template>
  <div>
    <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
      <h1>Upload images</h1>
      <div class="dropbox">
        <input
          type="file"
          multiple
          :name="uploadFieldName"
          :disabled="isSaving"
          @change="filesChange($event.target.name $event.target.files);
            fileCount = $event.target.files.length;
          "
          accept="image/*"
          class="input-file"
        />
        <p v-if="isInitial">
          Drag your file(s) here to begin<br />
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

@Component
export default class ImageUploader extends Vue {
  name = "app";
  uploadedFiles = [];
  uploadError = null;
  currentStatus = 0;
  uploadFieldName = "photos";

  STATUS_INITIAL = 0;
  STATUS_SAVING = 1;
  STATUS_SUCCESS = 2;
  STATUS_FAILED = 3;

  get isInitial() {
    return this.currentStatus === this.STATUS_INITIAL;
  }
  get isSaving() {
    return this.currentStatus === this.STATUS_SAVING;
  }
  get isSuccess() {
    return this.currentStatus === this.STATUS_SUCCESS;
  }
  get isFailed() {
    return this.currentStatus === this.STATUS_FAILED;
  }

  reset() {
    // reset form to initial state
    this.currentStatus = this.STATUS_INITIAL;
    this.uploadedFiles = [];
    this.uploadError = null;
  }

  save(formData) {
    // upload data to the server
    this.currentStatus = this.STATUS_SAVING;

    upload(formData)
      .then(x => {
        this.uploadedFiles = [].concat(x);
        this.currentStatus = this.STATUS_SUCCESS;
      })
      .catch(err => {
        this.uploadError = err.response;
        this.currentStatus = this.STATUS_FAILED;
      });
  }

  filesChange(fieldName, fileList) {
    // handle file changes
    const formData = new FormData();

    if (!fileList.length) return;

    // append the files to FormData
    Array.from(Array(fileList.length).keys()).map(x => {
      formData.append(fieldName, fileList[x], fileList[x].name);
    });

    // save it
    this.save(formData);
  }

  mounted() {
    this.reset();
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
