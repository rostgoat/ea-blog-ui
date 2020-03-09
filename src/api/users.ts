import request from "@/utils/request";
import { UserSubmit } from "@/store/models/users.models";

export const loginUser = (data: UserSubmit) => {
  return request({
    url: "/auth/login",
    method: "post",
    data
  });
};
