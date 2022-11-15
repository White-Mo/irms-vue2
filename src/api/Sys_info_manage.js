import request from "@/utils/request";

// 权限管理 获取数据
export function getAuthorData(data) {
  return request({
    url:'/home/authority/getFosGroupByPage',
    method:'get',
    params:data
  })
}

//
export function getAutherCount() {
  return request( {
    url:'/home/authority/getFosGroupCount',
    method:'get',
  })
}
