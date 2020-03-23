<template>
  <div>Post View</div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class ViewPost extends Vue {
  destinationId = this.$route.params.id;
}
</script>

<style></style>
