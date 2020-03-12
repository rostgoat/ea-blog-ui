import request from "@/utils/request";

export const upload = (data: FormData) => {
  return request({
    url: "/photos/upload",
    method: "post",
    data
  });
};