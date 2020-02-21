<template>
  <v-app>
    <v-card class="mx-auto mt-5" outlined>
      <v-container class="posts-list__content">
        <v-card elevation="0" class="posts-list__img-container">
          <v-img
            class="pa-2 posts-list__img"
            src="https://picsum.photos/510/300?random"
            max-width="400"
            max-height="400"
          ></v-img>
        </v-card>
        <v-card elevation="0">
          <v-card-title class="mb-3 posts-list__title"
            >Call of Duty: Black Ops 4</v-card-title
          >
          <v-card-subtitle class="posts-list__subtitle">
            Integer vitae tellus ut quam convallis vestibulum. Duis tristique
            lacus augue, sed mollis turpis scelerisque nec. Donec imperdiet
            accumsan fermentum. Morbi quis metus congue diam aliquam commodo.
            Maecenas eu justo at ante aliquam semper. Aenean accumsan nulla ac
            felis blandit, nec tristique purus pulvinar.
          </v-card-subtitle>

          <v-card-actions class="posts-list__actions">
            <v-list-item class="grow ">
              <v-list-item-content>
                <v-list-item-title class="posts-list__actions-author"
                  >Evan You</v-list-item-title
                >
              </v-list-item-content>

              <v-row
                align="center"
                justify="end"
                class="posts-list__actions-buttons"
              >
                <v-icon class="mr-1">mdi-heart</v-icon>
                <span class="subheading mr-2">256</span>
                <span class="mr-1">·</span>
                <v-icon class="mr-1">mdi-share-variant</v-icon>
                <span class="subheading">45</span>
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-card>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class ListPosts extends Vue {
  name = "ListPosts";
}
</script>

<style lang="scss">
.posts-list {
  &__title {
  }

  &__content {
    display: flex;
  }
  &-img {
    background-position: 53% 53% !important;
  }
}
</style>
