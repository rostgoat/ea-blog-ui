<template>
  <v-card class="mx-auto mt-5 posts-list-item" outlined>
    <v-container class="posts-list-item__content">
      <v-card flat class="posts-list-item__img-container">
        <v-img
          class="pa-2 posts-list-item__img"
          src="https://picsum.photos/510/300?random"
          max-width="300"
          max-height="300"
        ></v-img>
      </v-card>
      <v-card flat class="posts-list-item__description-container">
        <v-card-title class="mb-4 posts-list-item__title"
          >Call of Duty: Black Ops 4</v-card-title
        >
        <v-card-subtitle class="posts-list-item__subtitle">
          Integer vitae tellus ut quam convallis vestibulum. Duis tristique
          lacus augue, sed mollis turpis scelerisque nec. Donec imperdiet
          accumsan fermentum. Morbi quis metus congue diam aliquam commodo.
          Maecenas eu justo at ante aliquam semper. Aenean accumsan nulla ac
          felis blandit, nec tristique purus pulvinar.
        </v-card-subtitle>

        <div class="posts-list-item__actions mt-3">
          <div class="posts-list-item__actions-author">
            Evan You
          </div>

          <div class="posts-list-item__actions-date">
            Feb 14, 2020
          </div>

          <v-row
            align="center"
            justify="end"
            class="posts-list-item__actions-buttons"
          >
            <v-icon class="mr-1">mdi-heart</v-icon>
            <span class="subheading mr-2">256</span>
            <v-icon class="mr-1">mdi-share-variant</v-icon>
            <span class="subheading">45</span>
          </v-row>
        </div>
      </v-card>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class PostsListItem extends Vue {
  name = "PostsListItem";
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
