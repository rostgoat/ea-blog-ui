import Vue from "vue";
import { Mixin } from "vue-mixin-decorator";
import { signedUrl } from "@/api/storage";

@Mixin
export default class StorageMixin extends Vue {
  /**
   * AWS S3 get signed url for image from bucket
   * @param bucket S3 Bucket
   * @param key Bucket key
   */
  async $storageMixinGetSignedURL(bucket: string, key: string) {
    return await signedUrl({
      bucket,
      key
    });
  }
}
