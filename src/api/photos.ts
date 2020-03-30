import request from "@/utils/request";

export const upload = (data: any) => {
  return request({
    url: "/photos/upload",
    method: "post",
    data
  });
};

export const signedUrl = (params: any) => {
  return request({
    url: "/photos/signedUrl",
    method: "get",
    params
  })
}