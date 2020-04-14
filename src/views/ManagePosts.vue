<template>
  <v-card class="mx-auto mt-5 posts-list-item" outlined>
    <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editPost(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deletePost(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { getOneByUser } from "@/api/posts";
import { UsersModule } from "@/store/modules/users";

@Component
export default class ManagePosts extends Vue {
  posts = [];

  /**
   * Get user from state
   */
  get loggedInUser() {
    return UsersModule.GET_USER;
  }

  async mounted() {
    this.posts = await getOneByUser({ user_uid: this.loggedInUser.uid });
    console.log("this.posts", this.posts);
  }

  async editPost() {
    console.log("edit post");
  }

  async deletePost() {
    console.log("delete post");
  }
}
</script>

<style></style>
