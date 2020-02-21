<template>
  <v-app>
    <PostListItem />
    <PostListItem />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import PostListItem from "@/components/PostsListItem.vue";

@Component({
  components: { PostListItem }
})
export default class PostsList extends Vue {
  name = "PostsList";
}
</script>

<style lang="scss">
.posts-list-item {
  &__content {
    display: flex;
  }

  &-img {
    background-position: 53% 53% !important;
  }

  &____img-container {
    width: 33%;
  }
  &____description-container {
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
