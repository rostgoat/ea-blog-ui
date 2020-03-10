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
import { PostsModule } from "@/store/modules/posts";

@Component({
  components: { PostListItem }
})
export default class PostsList extends Vue {
  name = "PostsList";
  posts = [];

  /**
   * Get all posts from state
   */
  get allPosts() {
    return PostsModule.getPosts;
  }

  /**
   * Get posts
   */
  async mounted() {
    if (this.allPosts.length <= 0) {
      await this.getPosts();
    } else {
      this.posts = this.allPosts;
    }
  }

  /**
   * Get all posts from all users and display them
   */
  async getPosts() {
    try {
      await PostsModule.getAllPosts();
      this.posts = PostsModule.getPosts;
    } catch (error) {
      throw new Error(error);
    }
  }
}
</script>

<style lang="scss">
.posts-list {
  &:nth-child(even) > .posts-list-item > .posts-list-item__content {
    flex-direction: row-reverse;
  }
}
</style>
