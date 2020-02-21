<template>
  <v-app><PostsList /> </v-app>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import PostsList from "@/components/PostsList.vue";

@Component({
  components: {
    PostsList
  }
})
export default class Home extends Vue {
  name = "Home";
}
</script>
