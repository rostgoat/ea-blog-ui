import request from "@/utils/request";
import { LikesSubmit } from "@/store/models/likes.models";

export const like = (data: LikesSubmit) => {
  return request({
    url: "/likes/like",
    method: "post",
    data
  });
};

export const unlike = (data: LikesSubmit) => {
  return request({
    url: "/likes/unlike",
    method: "put",
    data
  });
};

export const status = (data: LikesSubmit) => {
  return request({
    url: "/likes/status",
    method: "get",
    data
  });
};
