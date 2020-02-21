<template>
  <v-app>
    <div v-for="post in posts" :key="post.id" class="posts-list">
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
    },
    {
      id: 2,
      title: "Battlefield 1: Return of the Nazis",
      content: `Integer vitae tellus ut quam convallis vestibulum. Duis tristique
          lacus augue, sed mollis turpis scelerisque nec. Donec imperdiet
          accumsan fermentum. Morbi quis metus congue diam aliquam commodo.
          Maecenas eu justo at ante aliquam semper. Aenean accumsan nulla ac
          felis blandit, nec tristique purus pulvinar.`,
      author: "Johnny Lee",
      date: "Jan 1, 2020"
    }
  ];
}
</script>

<style lang="scss">
.posts-list {
  display: flex;
  flex-direction: column;

  .posts-list-item__content:nth-child(odd) {
    background-color: aqua;
    flex-direction: row-reverse;
  }
}
</style>
