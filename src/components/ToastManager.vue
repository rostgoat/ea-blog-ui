<template>
  <transition name="toasts" tag="div" class="c-toasts">
    <Toast v-if="toast.show" :toast="toast" @click="hideToast"></Toast>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import Toast from "@/components/Toast.vue";

@Component({
  components: { Toast }
})
export default class ToastManager extends Vue {
  @Prop() toast!: any;

  duration = 4000;

  addToast() {
    setTimeout(() => {
      this.removeToast();
    }, this.duration);
  }

  removeToast() {
    this.toast.show = false;
    clearInterval();
  }

  hideToast() {
    this.removeToast();
  }

  mounted() {
    setInterval(() => {
      this.addToast();
    }, this.duration);
  }
}
</script>

<style lang="scss">
.c-toasts {
  top: -25rem;
}
.toasts-enter-active {
  animation: bounce-in 1s ease forwards;
}

.toasts-leave-active {
  // transition: opacity 0.2s ease-in-out,
  animation: bounce-in-reverse 1.3s forwards;
}

@keyframes bounce-in {
  0% {
    opacity: 0;
  }
  25% {
    opacity: 0.25;
    transform: translateY(2rem);
  }
  50% {
    opacity: 0.5;
    transform: translateY(0.5rem);
  }
  75% {
    opacity: 0.75;
    transform: translateY(1rem);
  }
  100% {
    opacity: 1;
    transform: translateY(0rem);
  }
}

@keyframes bounce-in-reverse {
  0% {
    opacity: 1;
    transform: translateY(0rem);
  }
  25% {
    opacity: 0.75;
    transform: translateY(1rem);
  }
  100% {
    opacity: 0;
    transform: translateY(-10rem);
  }
}
</style>
