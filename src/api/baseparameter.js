import request from '@/utils/request'
//通过页码获取单位
export function getPostByPage(data) {
  return request({
    url: '/home/baseparameter/getPostByPage',
    method: 'get',
    params: data
  })
}
//通过页码获取部门
export function getPostDepartmentByPage(data) {
  return request({
    url: '/home/baseparameter/getPostDepartmentByPage',
    method: 'get',
    params: data
  })
}
//新增单位
export function createPost(data) {
  return request({
    params: data,
    url: '/home/baseparameter/createPost',
    method: 'post',
    responseType: 'json'
  })
}

//新增部门
export function createDepartment(data) {
  return request({
    params: data,
    url: '/home/baseparameter/createDepartment',
    method: 'post',
    responseType: 'json'
  })
}
//检查单位名称是否重复
export function checkPostName(data) {
  return request({
    params: data,
    url: '/home/baseparameter/checkPostName',
    method: 'post',
    responseType: 'json'
  })
}
//检查单位代码是否重复
export function checkPostCode(data) {
  return request({
    params: data,
    url: '/home/baseparameter/checkPostCode',
    method: 'post',
    responseType: 'json'
  })
}

//检查单位名称是否重复
export function checkDepartmentName(data) {
  return request({
    params: data,
    url: '/home/baseparameter/checkDepartmentName',
    method: 'post',
    responseType: 'json'
  })
}
//检查单位代码是否重复
export function checkDepartmentCode(data) {
  return request({
    params: data,
    url: '/home/baseparameter/checkDepartmentCode',
    method: 'post',
    responseType: 'json'
  })
}

//删除单位
export function delPost(data) {
  return request({
    url: '/home/baseparameter/delPost',
    method: 'delete',
    params: {postId : data}
  })
}

//删除部门
export function delPostDepartment(data) {
  return request({
    url: '/home/baseparameter/delPostDepartment',
    method: 'delete',
    params: {departmentId : data}
  })
}
