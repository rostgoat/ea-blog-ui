import Vue from "vue";
import { Mixin } from "vue-mixin-decorator";
import { Message } from "element-ui";

@Mixin
export default class SuccessMixin extends Vue {
  $successMixinMessage(message: string) {
    Message({
      message: message,
      type: "success",
      duration: 3000,
      showClose: true,
      offset: 80
    });
  }
}
