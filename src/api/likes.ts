import request from "@/utils/request";
import { LikesSubmit } from "@/store/models/likes.models";

export const like = (data: LikesSubmit) => {
  return request({
    url: "/likes/like",
    method: "post",
    data,
  });
};

export const dislike = (data: LikesSubmit) => {
    return request({
      url: "/likes/dislike",
      method: "put",
      data,
    });
  };