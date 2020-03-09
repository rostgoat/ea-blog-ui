import request from "@/utils/request";
import { PostSubmit } from "@/store/models/posts.models";

export const create = (data: PostSubmit) => {
  return request({
    url: "/posts/create",
    method: "post",
    data
  });
};

export const edit = (uid: string, data: PostSubmit) => {
  return request({
    url: `/posts/${uid}`,
    method: "put",
    data
  });
};

export const detroy = (uid: string) => {
  return request({
    url: `/posts/${uid}`,
    method: "delete"
  });
};
