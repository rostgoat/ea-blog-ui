import request from "@/utils/request";
import { LikesSubmit } from "@/store/models/likes.models";

export const like = (data: Partial<LikesSubmit>) => {
  return request({
    url: "/likes/like",
    method: "post",
    data
  });
};

export const unlike = (data: Partial<LikesSubmit>) => {
  return request({
    url: "/likes/unlike",
    method: "put",
    data
  });
};

