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

  async mounted() {
    await this.getPosts();
  }

  async getPosts() {
    try {
      const posts = await PostsModule.getAllPosts();
      console.log("posts", posts);
      // // this.onClickCreatePostSuccess();
    } catch (error) {
      throw new Error(error);
    }
  }

  // onClickGetAllPosts() {}
}
</script>

<style lang="scss">
.posts-list {
  &:nth-child(even) > .posts-list-item > .posts-list-item__content {
    flex-direction: row-reverse;
  }
}
</style>
