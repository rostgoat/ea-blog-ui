import request from "@/utils/request";
import { UserSubmit, UserReponse } from "@/store/models";

export const loginUser = (data: UserSubmit) => {
  return request({
    url: "/auth/login",
    method: "post",
    data
  });
};

export const logoutUser = () => {
  return request({
    url: "/auth/logout",
    method: "post"
  });
};
