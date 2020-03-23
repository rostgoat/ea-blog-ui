<template>
  <v-card class="mx-auto mt-5 view-post" outlined>
    <v-container class="view-post__content">
      <v-card-title class="view-post__title">
        <h3>
          {{ post.title }}
        </h3>
      </v-card-title>
      <v-card-subtitle class="view-post__subtitle">
        <h4>
          {{ post.sub_title }}
        </h4>
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
          :src="postImage"
          aspect-ratio="2.4"
          width="500"
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

@Component
export default class ViewPost extends Vue {
  post: any = {};
  postUID = "";
  postDate: any = "";
  postAuthor = "";
  postImage = "";

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
    this.postImage = `${process.env.VUE_APP_BASE_URL}/${this.post.photo.title}`;
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
    const DIFF = 500;
    let len = this.post.content.length;
    let interval = DIFF;
    let beginningIndex = 0;

    while (len >= DIFF) {
      this.paragraphs.push(post.content.substring(beginningIndex, interval));
      beginningIndex += DIFF;
      interval += DIFF;
      len -= DIFF;
    }

    this.paragraphs.push(
      post.content.substring(beginningIndex, beginningIndex + len)
    );
  }
}
</script>

<style lang="scss">
.view-post {
  &__title {
    padding: 0px !important;
  }

  &__subtitle {
    padding: 0px !important;
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
