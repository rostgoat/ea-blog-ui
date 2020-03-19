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
import { mapGetters } from "vuex";

@Component({
  components: { PostListItem }
})
export default class PostsList extends Vue {
  name = "PostsList";
  posts = [];

  /**
   * Get posts either from state or from API
   */
  async mounted() {
    if (this.posts.length <= 0) {
      await this.getPosts();
    } else {
      this.posts = PostsModule.GET_POSTS;
    }
  }

  /**
   * Get all posts from all users and display them
   */
  async getPosts() {
    try {
      await PostsModule.GET_ALL_POSTS();
      this.posts = PostsModule.GET_POSTS;
      console.log("this.posts", this.posts);
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
