import request from "@/utils/request";
import { UserSubmit, UserReponse } from "@/store/models";

export const loginUser = (data: UserSubmit) => {
  request({
    url: "/auth/login",
    method: "post",
    data
  });
};

export const logoutUser = () => {
  request({
    url: "/auth/logout",
    method: "post"
  });
};
