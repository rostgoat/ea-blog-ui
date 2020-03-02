<template>
  <div :class="['c-toasts__item', 'c-toasts__item--' + toast.type]">
    <v-icon>mdi-alert</v-icon>
    <span class="c-toasts__item-text">{{ toast.text }}</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Toast extends Vue {
  @Prop() toast!: object;
}
</script>

<style lang="scss">
// Element
.c-toasts__item {
  display: flex;
  align-items: center;

  width: 50%;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 5px;

  color: #fff;
}

.c-toasts__item-text {
  font-size: 1.1rem;
  line-height: 1.5;
  margin-left: 1rem;
}

.c-toasts__item--success {
  background-color: #339900;
}

.c-toasts__item--error {
  background-color: #be3030;
}

.c-toasts__item--warning {
  background-color: #ffcc00;
}

.c-toasts__item--info {
  background-color: #40a6ce;
}
</style>
