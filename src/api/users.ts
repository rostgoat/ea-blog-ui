import request from "@/utils/request";
import {
  UserSubmitLogin,
  UserSubmitRegister
} from "@/store/models/users.models";

export const login = (data: UserSubmitLogin) => {
  return request({
    url: "/auth/login",
    method: "post",
    data
  });
};

export const register = (data: UserSubmitRegister) => {
  return request({
    url: "/auth/register",
    method: "post",
    data
  });
};

export const getUsersLike = () => {
  return request({
    url: `/users/likes`,
    method: "get"
  });
};