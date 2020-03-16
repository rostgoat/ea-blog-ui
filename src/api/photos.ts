import request from "@/utils/request";

export const upload = (data: any) => {
  return request({
    url: "/photos/upload",
    method: "post",
    data
  });
};