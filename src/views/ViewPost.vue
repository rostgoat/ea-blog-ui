<template>
  <v-card class="mx-auto mt-5 view-post" max-width="50%" outlined>
    <v-container class="view-post__content">
      <v-card-title class="view-post__title">
        <h1>
          {{ post.title }}
        </h1>
      </v-card-title>
      <v-card-subtitle class="view-post__subtitle">
        <h3>
          {{ post.sub_title }}
        </h3>
      </v-card-subtitle>
      <div class="view-post__details-container">
        <div class="view-post__details-container--created-by">
          {{ postAuthor }}
        </div>
        <div class="view-post__details-container--created-date">
          {{ postDate }}
        </div>
      </div>
      <div class="view-post__img-container">
        <v-img
          id="photo"
          class="pa-2 posts-list-item__img"
          :src="imageSource"
          aspect-ratio="2.4"
          width="400"
          height="400"
          contain
        ></v-img>
      </div>

      <div class="view-post__description">
        <div v-for="paragraph in paragraphs" :key="paragraph">
          <div class="view-post__paragraph">
            {{ paragraph }}
          </div>
        </div>
      </div>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { getOne } from "../api/posts";
import moment from "moment";
import StorageMixin from "../mixins/storage";
import { Mixins } from "vue-mixin-decorator";

@Component
export default class ViewPost extends Mixins<StorageMixin>(StorageMixin) {
  post: any = {};
  postUID = "";
  postDate: any = "";
  postAuthor = "";
  imageSource = "";

  paragraphs: string[] = [];

  /**
   * Get post uid from route and fetch it
   */
  async mounted() {
    this.postUID = this.$route.params.id;
    await this.getPostData(this.postUID);
  }

  /**
   * Get post data from db
   */
  async getPostData(uid: string) {
    this.post = await getOne({ uid });
    this.formatContentParagraphs(this.post);
    this.formatPostCreatedDate(this.post.created_at);
    this.postAuthor = this.post.user.name;
    this.imageSource = await this.getImageURL();
  }

  /**
   * Get signed url from s3
   */
  async getImageURL() {
    return await this.$storageMixinGetSignedURL(
      process.env.VUE_APP_AWS_BUCKET,
      this.post.post_image_bucket_key
    );
  }

  /**
   * Format post creation date for user readibility
   */
  formatPostCreatedDate(date: Date) {
    this.postDate = moment(date).format("MMMM DD, YYYY");
  }

  /**
   * Divide the content into 500 word chunks with space in between
   * and display the content on the page
   */
  formatContentParagraphs(post: any) {
    const len = this.post.content.length;
    let beginningIndex = 0;
    const INTERVAL = 500;
    let count = INTERVAL;
    const contentArray: string[] = [...post.content];

    // cut up content into 500 word chunks
    for (let index = 0; index < contentArray.length; index++) {
      if (index >= count && contentArray[index].includes(".")) {
        const substr = post.content.substring(beginningIndex, index + 1);
        this.paragraphs.push(substr);
        beginningIndex = index + 1;
        count += INTERVAL;
      }

      // if one chunk remains that is less than 500, insert it at the end of the array
      if (len - beginningIndex <= 500) {
        const substr = post.content.substring(beginningIndex, len);
        this.paragraphs.push(substr);
        break;
      }
    }
  }
}
</script>

<style lang="scss">
.view-post {
  &__title {
    padding: 0px !important;
    margin-bottom: 1rem;
  }

  &__subtitle {
    padding: 0px !important;
    color: map-get($colors, primary) !important;
    font-style: italic !important;
  }

  &__description {
    padding: 0px !important;
  }

  &__paragraph {
    margin-bottom: 2rem;
    text-align: justify;

    &:first-child {
      margin-top: 1rem;
    }
  }

  &__details-container {
    display: flex;
    align-items: left;

    &--created-by {
      color: map-get($colors, primary) !important;
      margin-right: 1rem;
    }

    &--created-date {
      color: map-get($colors, primary) !important;
    }
  }

  &__img-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
