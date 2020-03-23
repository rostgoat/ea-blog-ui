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