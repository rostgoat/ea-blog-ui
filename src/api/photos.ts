import request from "@/utils/request";

export const upload = (data: any) => {
  console.log('data', data)
  return request({
    url: "/photos/upload",
    method: "post",
    data,
  });
};