<template>
  <v-app>
    <div v-for="post in posts" :key="post.id">
      <PostListItem :post="post" />
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import PostListItem from "@/components/PostsListItem.vue";

@Component({
  components: { PostListItem }
})
export default class PostsList extends Vue {
  name = "PostsList";
  posts = [
    {
      id: 1,
      title: "Call of Duty: Black Ops 4",
      content: `Integer vitae tellus ut quam convallis vestibulum. Duis tristique
          lacus augue, sed mollis turpis scelerisque nec. Donec imperdiet
          accumsan fermentum. Morbi quis metus congue diam aliquam commodo.
          Maecenas eu justo at ante aliquam semper. Aenean accumsan nulla ac
          felis blandit, nec tristique purus pulvinar.`,
      author: "Evan You",
      date: "Feb 14, 2020"
    }
  ];
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
