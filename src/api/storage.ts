import request from "@/utils/request";

export const upload = (data: any) => {
  return request({
    url: "/storage/upload",
    method: "post",
    data
  });
};

export const signedUrl = (params: any) => {
  return request({
    url: "/storage/signedUrl",
    method: "get",
    params
  })
}